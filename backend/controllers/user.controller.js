exports.get_badge_message = function (req, res) {
    let db = req.db;
    let user_id = req.body.user_id;

    console.log("Hello");

    db.collection("Player").find({}, {}, function(e, docs) {
        let userElement = null;
        
        docs.forEach(element => {
            if (element.core_app_id === user_id) {
                userElement = element;
            }
        });

        if (userElement === null) {
            res.status(401).send({ error: 'Invalid UserID' });
        } else {
            res.status(200);
            res.json({
                user_id: userElement.core_app_id,
                badge_text: "Top " + userElement.data.best_ranking + " in Ranking"
            });
            res.end();
        }
    });
}