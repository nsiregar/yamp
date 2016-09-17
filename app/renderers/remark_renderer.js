"use strict";

const fs = require('fs');

const htmlMinifier = require('../minifier').html;
const Renderer = require('./renderer');

function nullRenderer(content,options,done){
    return done(null,content);
}

module.exports = class RemarkRenderer extends Renderer {
    constructor(options) {
        super(options, "remark.ejs", nullRenderer);
        this.output = "remark";
    }
    
    //args: content, done
    fileOutput(content, done) {
        if (this.options.minify) content = htmlMinifier(content);
        fs.writeFile(this.options.outputFilename + '.html', content, (err) => {
            if (err) return done(new Error("Error writing remark (html) file" + err));
            else return done(null);
        });
    }
};
