var express = require('express')
var app = express()

app.use(express.static('./dist/prg-demo'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/prg-demo/' }
    );
});
app.listen(process.env.PORT || 8080);
