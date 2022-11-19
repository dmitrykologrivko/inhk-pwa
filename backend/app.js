const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.static('public'));

/*
 * Proxy Inhk server
 */
app.get('/api/today', routes.todaySchedule);
app.get('/api/date/:date', routes.onDateSchedule);
app.get('/api/teacher/:id', routes.teacherSchedule);
app.get('/api/group/:id', routes.groupSchedule);
app.get('/api/teachers', routes.teachers);
app.get('/api/groups', routes.groups);

app.all('*', function(req, res){
    res
        .status(404)
        .send();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res
        .status(500)
        .json({});
})

app.listen(process.env.PORT || 8000);
