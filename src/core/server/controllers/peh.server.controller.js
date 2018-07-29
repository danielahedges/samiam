import mongoose from 'mongoose';

var User;

export class PehController {
  static init() {
    User = mongoose.model('User');
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
}
