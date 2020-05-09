from flask import Flask, send_from_directory, render_template, redirect, request, jsonify
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return render_template("main.html", button_list=button_list)


class Button:
    __id = 0

    def __init__(self, text: str, action_code: str):
        self.name = text
        self.text = text
        self.action_code = action_code
        self.id = Button.__id
        Button.__id += 1

    def action(self):
        exec(self.action_code)


CaptureButton = Button("Capture", "capture_pic()")
DeleteButton = Button("Delete", "delete_pic()")
SaveButton = Button("Save", "save_pic()")

button_list = [CaptureButton, DeleteButton, SaveButton]

action_buttons = {button.id: button for button in button_list}


def capture_pic():
    print(request.get_json())
    print("picture captured!")

def delete_pic():
    print("picture deleted!")

def save_pic():
    print("picture saved!")


@app.template_filter('get_action_script')
def get_action_script(id_: int):
    return action_buttons[id_].action_code


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


@app.route('/get_photo')
def load_photo():
    print('loading_photo')
    print(request.get_json())
    result = jsonify({'src': '/static/1_blue.png'})
    print(result)
    return result


current_image = None


def get_photo_src():
    print(request.form)
    return send_from_directory(
        os.path.join(app.root_path, 'static'),
        '1_blue.png'
    )


if __name__ == '__main__':
    app.run(debug=True)
