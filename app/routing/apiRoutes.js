
var friendsArray = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends",function(req,res){
        res.json(friendsArray);
        console.log("The friends array has beend sent to the front end");
    })
    app.post("/api/addSurvey",function(req,res){
        console.log("A new Survey has been recieved in the backend");
        var unparsedScore = req.body.scores;
        var parsedScore = [];
        unparsedScore.forEach(element => {
            element = parseInt(element);
            parsedScore.push(element);
        });
        var newSurvey = {
            name: req.body.name,
            photo: req.body.photo,
            scores: parsedScore
        }
        friendsArray.push(newSurvey);
        var thisUserIndex = friendsArray.length - 1
        var friendsDiff = [];
        for (i=0;i<friendsArray.length - 1;i++){
            var thisFriendDiff = 0;
            for(j=0;j<=9;j++){
                thisFriendDiff += Math.abs(friendsArray[i].scores[j] - friendsArray[thisUserIndex].scores[j])
            }
            friendsDiff.push(thisFriendDiff);
        }
        var min = friendsDiff[0];
        var minIndex = 0;

        for (var y=1;y<friendsDiff.length;y++){
            if (friendsDiff[y] < min) {
                minIndex = y;
                min = friendsDiff[y];
            }
        }
        res.json({
            bestmatch: friendsArray[minIndex].name
        });
    })
}