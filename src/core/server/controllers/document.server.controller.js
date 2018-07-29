import mongoose from 'mongoose';

var DocModel;

export class DocumentController {
  static init() {
    DocModel = mongoose.model('Document');
  }
  static readDocument(req, res) {
    return DocModel.findById(req.docId)
      .exec()
      .then(doc => {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(Buffer.from(doc.base64, 'base64'));
      });
  }
  static setDocId(req, res, next, docId) {
    req.docId = docId;
    next();
  }
  static listUnverifiedDocs(req, res) {
    return DocModel.find(
      {
        status: 'Unverified'
      },
      {
        base64: false
      }
    )
      .exec()
      .then(docs => {
        res.json(docs);
      });
  }
  static verify(req, res) {
    return DocModel.update(
      {
        _id: req.docId,
        status: 'Unverified'
      },
      {
        $set: {
          status: 'Verified'
        }
      }
    )
      .exec()
      .then(() => {
        res.status(204).send({});
      });
  }
}
