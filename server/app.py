import json
from flask import Flask, Response, request
from flask_cors import CORS
import youtube_dl

app = Flask(__name__)
CORS(app)


class Logger:
    def debug(self, msg):
        print('[Debug]: %s', msg)

    def warning(self, msg):
        print('[Warning]: %s', msg)

    def error(self, msg):
        print('[Error]: %s', msg)

def hook(d):
    if d['status'] == 'finished':
        print('Done downloading....')

@app.route('/options', methods=['POST'])
def options():

@app.route('/', methods=['POST', 'GET'])
def test():
    options = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'logger': Logger(),
        'progress_hook': [hook],
    }

    url = json.loads(request.data)

    with youtube_dl.YoutubeDL(options) as ydl:
        ydl.download([url['link']])

    return Response(
        status=200,
        mimetype='application/json',
        response=json.dumps({'hi': 'there'}), 
        headers={'Access-Control-Allow-Origin': '*'},
    )
