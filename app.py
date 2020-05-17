from flask import Flask, send_from_directory, render_template, redirect, request, jsonify, get_template_attribute
import os

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello_world():
    return render_template("main.html", button_list=button_list, lut_list=lut_list)


class Button:
    __id = 0

    def __init__(self, text: str, action_code='', html_content=''):
        self.name = text
        self.text = text
        self.action_code = action_code
        self.load_code = ""
        self.id = Button.__id
        self.content = html_content
        Button.__id += 1

    def action(self):
        exec(self.action_code)


CaptureButton = Button("Capture", "capturePic()")
DeleteButton = Button("Delete", "deletePic()")
# SaveButton = Button("Save", "savePic()")
with app.app_context():
    set_name = get_template_attribute("buttonDownloadLink.html", "set_name")

DownloadButton = Button("Download", "downloadPic(this)", set_name('image.png'))
DownloadButton.load_code = '''
  document.getElementById('a_download').href = document.getElementById('photo_image').src;
'''

button_list = [CaptureButton, DeleteButton, DownloadButton]
action_buttons = {button.id: button for button in button_list}


class LUT:
    __id = 0

    def __init__(self, name: str, image_filename: str, lut_filename: str):
        self.id = self.__id
        self.__id += 1
        self.name = name
        self.image_filename = image_filename
        self.lut_filename = lut_filename


lut_list = []


def createLUTs():
    luts = [f for f in os.listdir(os.path.join(app.root_path, 'static/luts')) if f.endswith('.CUBE') or f.endswith('.cube')]
    for lut in luts:
        lut_list.append(LUT(lut[0:-5:1], 'base.jpg', lut))
        lut_list.sort(key=lambda x: x.name)


@app.route('/get_lut_image/<path:filename>')
def get_lut_image(filename: str):
    print(os.path.join(app.root_path, 'static/luts'))
    return send_from_directory(
        os.path.join(app.root_path, 'static/luts'),
        filename
    )


@app.route('/get_lut', methods=["GET"])
def get_lut():
    filename = request.args.get('filename')
    print(filename)
    print(os.path.join(app.root_path, 'static/luts'))
    return send_from_directory(
        os.path.join(app.root_path, 'static/luts'),
        filename
    )


@app.route('/action_button_pressed/<id_>', methods=["GET"])
def action_button_pressed(id_):
    action_buttons[int(id_)].action()
    return 'OK', 204


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        'favicon.ico'
    )


@app.route('/get_default_photo_url', methods=["GET"])
def load_default_photo():
    print('loading_photo')
    result = jsonify({'src': '/static/placeholder1.png'})
    return result


if __name__ == '__main__':
    createLUTs()
    app.run(debug=False)
