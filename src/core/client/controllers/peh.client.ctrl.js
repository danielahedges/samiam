class PehController {
  constructor(deps) {
    this.deps = deps;
  }
  init() {
    this.refresh();
    this.deps.$scope.$$postDigest(() => {
      $('.dropify').dropify();
    });
  }
  refresh() {
    this.deps.PehService.listAgents().then(agents => {
      this.agents = agents;
    });
    this.deps.PehService.listDocuments().then(documents => {
      this.documents = documents;
    });
  }
  deleteAgent(id) {
    this.deps.PehService.deleteAgent(id).then(() => {
      this.refresh();
    });
  }
  addDocument() {
    this.readFast();
  }
  readFast() {
    var f = document.getElementById('photo-file').files[0];
    if (f) {
      this.newFileName = f.name;
      this.newFileType = f.type;
      var r = new FileReader();
      r.onloadend = e => {
        var data = e.target.result;
        this._resetDropify();
        this._fastAdd(data);
      };
      r.readAsArrayBuffer(f);
    } else {
      // error case
    }
  }
  _resetDropify() {
    $('.dropify-clear').click();
  }
  _fastAdd(buffer) {
    var base64 = PehController._arrayBufferToBase64(buffer);
    this.deps.PehService.addDocument({
      base64: base64,
      filename: this.newFileName,
      format: this.newFileType,
      docType: 'TXDL',
      status: 'Unverified'
    }).then(() => {
      this.refresh();
    });
  }
  static _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; ++i) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

angular.module('Core').controller('PehController', [
  '$scope',
  'PehService',
  ($scope, PehService) =>
    new PehController({
      $scope,
      PehService
    })
]);
