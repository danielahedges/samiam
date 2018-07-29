import { CaseController } from '../controllers/case.server.controller';
import { UserController } from '../controllers/user.server.core.controller';
import { PehService } from '../services/peh.server.services';
import { PehController } from '../controllers/peh.server.controller';
import { DocumentController } from '../controllers/document.server.controller';

export class ApiRoutes {
  static init(app) {
    PehService.init();
    CaseController.init();
    PehController.init();
    DocumentController.init();

    // Case workers
    app
      .route('/pehs')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.pehList
      )
      .post(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.pehCreate
      );

    app
      .route('/pehs/:pehid')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('case'),
        CaseController.getPeh,
        CaseController.pehRead
      );

    app
      .route('/agents')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('peh'),
        PehController.listAgents
      );

    app
      .route('/agents/:agentId')
      .delete(
        UserController.requiresLogin,
        UserController.requiresRole('peh'),
        PehController.deleteAgent
      );

    app
      .route('/documents')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('peh'),
        PehController.listDocuments
      )
      .post(
        UserController.requiresLogin,
        UserController.requiresRole('peh'),
        PehController.addDocument
      );

    app
      .route('/documents/:docId')
      .get(UserController.requiresLogin, DocumentController.readDocument);

    app
      .route('/unverifiedDocs')
      .get(
        UserController.requiresLogin,
        UserController.requiresRole('service'),
        DocumentController.listUnverifiedDocs
      );

    app
      .route('/verifications/:docId')
      .post(
        UserController.requiresLogin,
        UserController.requiresRole('service'),
        DocumentController.verify
      );

    app.param('pehid', CaseController.setPehid);
    app.param('agentId', PehController.setAgentId);
    app.param('docId', DocumentController.setDocId);
  }
}
