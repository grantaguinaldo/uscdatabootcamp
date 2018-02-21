from flask import Flask, render_template
import mongo_storage


app = Flask(__name__)


@app.route('/')
def index():

    marsScrapeDataOutput = mongo_storage.mongo_store()

    htmlTable = marsScrapeDataOutput[0]['dataHtml']
    headline = marsScrapeDataOutput[0]['headline']
    teaser = marsScrapeDataOutput[0]['teaser']
    featuredImage = marsScrapeDataOutput[0]['image']

    hemiImage1Url = marsScrapeDataOutput[0]['hemisphere'][0]['img_url']
    hemiImage1 = marsScrapeDataOutput[0]['hemisphere'][0]['title']

    hemiImage2Url = marsScrapeDataOutput[0]['hemisphere'][1]['img_url']
    hemiImage2 = marsScrapeDataOutput[0]['hemisphere'][1]['title']

    hemiImage3Url = marsScrapeDataOutput[0]['hemisphere'][2]['img_url']
    hemiImage3 = marsScrapeDataOutput[0]['hemisphere'][2]['title']

    hemiImage4Url = marsScrapeDataOutput[0]['hemisphere'][3]['img_url']
    hemiImage4 = marsScrapeDataOutput[0]['hemisphere'][3]['title']

    return render_template('index.html', htmlTable=htmlTable, headline=headline, teaser=teaser, featuredImage=featuredImage, hemiImage1Url=hemiImage1Url, hemiImage2Url=hemiImage2Url, hemiImage2=hemiImage2, hemiImage3Url=hemiImage3Url, hemiImage3=hemiImage3, hemiImage4Url=hemiImage4Url, hemiImage4=hemiImage4)


if __name__ == '__main__':
    app.run(debug=True)
