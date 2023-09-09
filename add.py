from flask import Flask, render_template, request, redirect, url_for
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('add.html')

@app.route('/add_post', methods=['POST'])
def add_post():
    title = request.form['title']
    img_url = request.form['img_url']
    description = request.form['description']

    # Load existing data from the JSON file (if any)
    try:
        with open('db.json', 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {"posts": []}

    # Add the new post to the data
    new_post = {
        "title": title,
        "img": img_url,
        "desc": description
    }
    data["posts"].append(new_post)

    # Save the updated data back to the JSON file
    with open('db.json', 'w') as file:
        json.dump(data, file, indent=4)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
