/**
 * OutfitController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - allOutfits
    allOutfits: async function (req, res) {

        if (req.wantsJSON) {
            if (req.body != undefined) {
                const bName = req.body.oName || "";
                const bStyle = req.body.style || "";
                const bSeason = req.body.season || "";
                const bUserid = req.session.userid;
                var model = await Outfit.find({
                    where: {
                        oName: {
                            contains: bName,
                        },
                        style: {
                            contains: bStyle,
                        },
                        season: {
                            contains: bSeason,
                        },
                        userId: bUserid,
                    },
                    sort: 'createdAt DESC'
                })
            } else {
                var model = await Outfit.find({ where: { userId: bUserid } });
            }
        }

        if (req.wantsJSON) {
            //console.log("allOutfits: " + JSON.stringify(model));
            return res.json(model);
        } else {
            return res.view('outfit/allOutfits', { 'filteredOutfit': filteredO });
        }
    },

    // action - detail
    detail: async function (req, res) {

        var message = Outfit.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Outfit.findOne(req.params.id);

        if (!model) return res.notFound();


        if (req.wantsJSON) {
            return res.json(model);
        } else {
            return res.view('outfit/detail', { 'detail': model });
        }
    },

    // action - update
    updateOutfit: async function (req, res) {

        var message = Outfit.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        if (req.method == "GET") {

            var model = await Outfit.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('outfit/updateOutfit', { 'outfit': model });

        } else {

            if (typeof req.body.Outfit === "undefined")
                return res.badRequest("Form-data not received.");

            var models = await Outfit.update(req.params.id).set({
                oName: req.body.Outfit.oName,
                style: req.body.Outfit.style,
                image_URL: req.body.Outfit.image_URL,
                season: req.body.Outfit.season,
                remark: req.body.Outfit.remark,
                temperature: req.body.Outfit.temperature,
                OutfitId: req.body.Outfit.OutfitId,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");
        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var message = Outfit.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var models = await Outfit.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Outfit Deleted.");

    },

    populate: async function (req, res) {

        if (!['contains'].includes(req.params.association)) return res.notFound();

        const message = sails.getInvalidIdMsg(req.params);

        if (message) return res.badRequest(message);

        var model = await Outfit.findOne(req.params.id).populate(req.params.association);

        if (!model) return res.notFound();

        console.log("populate (outfitController)");
        return res.json(model);
    },

    // return outfit 
    returnOutfit: async function (req, res) {

        const bUserid = req.session.userid;
        const bOName = req.body.oName;

        console.log("bOName (returnOutfit): " + bOName)

        var model = await Outfit.find({ where: { oName: bOName } });//userId: bUserid,

        //console.log("retuenOutfit model: " + JSON.stringify(model))
        return res.json(model);
    },

    // return outfit count
    outfitCount: async function (req, res) {

        const bUserid = req.session.userid;
        var model = await Outfit.find({ where: { userId: bUserid } });

        return res.json(model.length);
    },

};

