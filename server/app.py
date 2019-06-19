"""
/ POST -> youtube url
"""
import json
from flask import Flask, Response, request
from flask_cors import CORS
import youtube_dl

app = Flask(__name__)
CORS(app)

class Logger:
    def debug(self, msg):
        print('[Debug]: %s' % msg)

    def warning(self, msg):
        print('[Warning]: %s' % msg)

    def error(self, msg):
        print('[Error]: %s' % msg)

def hook(d):
    if d['status'] == 'finished':
        print('Done downloading....')

@app.route('/options/', methods=['GET'])
def options():
    url = request.args.get('url')
    print('[URL]: %s ' % url)
    options = { 
        'logger': Logger(),
        'progress_hook': [hook]
     }
    available_options = []
    with youtube_dl.YoutubeDL(options) as ydl:
        info = ydl.extract_info(url, download=False)
        formats = info.get('formats')
        title = info.get('title')
        for single_format in formats:
            current_format = {
                'link': url,
                'title': title,
                'extension': single_format.get('ext'),
                'format_id': single_format.get('format_id'),
                'quality': single_format.get('format_note'),
                'format': 'audio' if 'audio' in single_format.get('format') else 'video'
            }

            available_options.append(current_format)
    
    return Response(
        mimetype='application/json',
        response=json.dumps(available_options),
        headers={'Access-Control-Allow-Origin': '*'}
    )

@app.route('/download', methods=['POST'])
def download():
    print(request.data)
    info = json.loads(request.data)
    options = {
        'format': info.get('format_id'),
        'logger': Logger(),
        'progress_hook': [hook],
        'outtmpl': info["title"] + ".{}".format(info["extension"])
    }
    with youtube_dl.YoutubeDL(options) as ydl:
        ydl.download([info['link']])

    return Response(
        status=200,
        mimetype='application/json',
        response=json.dumps({'message':'download_successful'}), 
        headers={'Access-Control-Allow-Origin': '*'}
    )
