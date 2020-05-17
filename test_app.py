import os
import pytest

from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    global luts_
    luts_ = [f for f in os.listdir(os.path.join(app.root_path, 'static/luts')) if
             f.endswith('.CUBE') or f.endswith('.cube')]

    with app.test_client() as client:
        yield client


def test_get_default_photo_url(client):
    assert b'{"src":"/static/placeholder1.png"}\n' in client.get('/get_default_photo_url').data


def test_favicon(client):
    assert client.get('/favicon.ico').status == "200 OK"


def test_route_main(client):
    assert client.get('/').status == "200 OK"


def test_action_button_pressed(client):
    assert str(client.get('/action_button_pressed/1').status).startswith("20")


def test_is_luts(client):
    # Testing .cube format file that it is LUTs
    for lut_ in luts_:
        print(client.get('/get_lut', query_string={'filename': lut_}))
        assert "#LUT data points" in str(client.get('/get_lut', query_string={'filename': lut_}).data)
        assert "LUT_3D_SIZE" in str(client.get('/get_lut', query_string={'filename': lut_}).data)


def test_lut_image_load(client):
    assert client.get('/get_lut_image/base.jpg').status == "200 OK"
