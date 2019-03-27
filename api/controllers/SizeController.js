/**
 * SizeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //create new size
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('size/createSize');

        if (typeof req.body.Size === "undefined")
            return res.badRequest("Form-data not received.");

        if (!await Size.find({ where: { userId: req.session.userid } })) return res.send("User not found");
        //var user = await User.find({ where: { userId: req.session.userid } });

        console.log("res: " + req.body.Size);
        if (!req.body.Size) return res.send("Size not find");;

        var size = req.body.Size;
        size.userId = req.session.userid;
        console.log("session userid: " + req.session.userid);
        console.log("Size.userId: " + size.userId);

        await Size.create(size);

        if (req.wantsJSON) {
            return res.json(size);
        } else {
            return res.ok("Successfully created!");
        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = Size.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await Size.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Size Deleted.");

    },

    // action - allSizes 
    allSizes: async function (req, res) {

        const qUserid = req.session.userid;

        var sizes = await Size.find({
            where: {
                userId: qUserid,
            },
            sort: 'createdAt DESC'
        });

        if (req.wantsJSON) {
            var model = await Size.find({
                where: {
                    userId: qUserid,
                },
                sort: 'createdAt DESC'
            });
        }
        if (req.wantsJSON) {
            return res.json(model);
        } else {
            return res.view('size/allSizes', { 'sizes': sizes });
        }
    },


};

