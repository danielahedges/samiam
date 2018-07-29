import mongoose from 'mongoose';

var User, DocModel;

export class PehController {
  static init() {
    User = mongoose.model('User');
    DocModel = mongoose.model('Document');
  }
  static listAgents(req, res) {
    User.find(
      {
        _id: {
          $in: req.user.agents
        }
      },
      {
        username: true,
        role: true
      }
    )
      .exec()
      .then(users => {
        res.json(users);
      });
  }
  static setAgentId(req, res, next, agentId) {
    req.agentId = agentId;
    next();
  }
  static deleteAgent(req, res) {
    User.update(
      {
        _id: req.user._id,
        agents: req.agentId
      },
      {
        $pull: {
          agents: req.agentId
        }
      }
    )
      .exec()
      .then(() => {
        User.update(
          {
            _id: req.agentId,
            clients: req.user._id
          },
          {
            $pull: {
              clients: req.user._id
            }
          }
        )
          .exec()
          .then(() => {
            res.status(204).send({});
          });
      });
  }
  static listDocuments(req, res) {
    return DocModel.find(
      {
        pehid: req.user._id
      },
      {
        filename: true,
        docType: true,
        format: true,
        status: true,
        binarySize: true
      }
    )
      .exec()
      .then(documents => {
        res.json(documents);
      });
  }
  static addDocument(req, res) {
    var doc = new DocModel({
      pehid: req.user._id,
      filename: req.body.filename,
      docType: req.body.docType,
      format: req.body.format,
      base64: req.body.base64,
      status: null,
      binarySize: req.body.base64.length
    });
    return doc.save().then(() => {
      res.status(204).send({});
    });
  }
}
