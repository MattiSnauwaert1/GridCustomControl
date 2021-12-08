rtl.module("GridCustomControlReg",["System","WEBLib.DesignIntf","GridCustomControl","Classes"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TVbGridLibraryRequirementsEditor",pas["WEBLib.DesignIntf"].TLibraryRequirementsEditor,function () {
    this.RequiresLibraries = function (Proc) {
      Proc('<script src="https:\/\/unpkg.com\/gridjs\/dist\/gridjs.umd.js" type="text\/javascript"><\/script>');
      Proc('<link href="https:\/\/unpkg.com\/gridjs\/dist\/theme\/mermaid.min.css" rel="stylesheet"\/>');
    };
  });
  this.Register = function () {
    pas["WEBLib.DesignIntf"].RegisterLibraryRequirementsEditor(pas.GridCustomControl.TVbGrid,$mod.TVbGridLibraryRequirementsEditor);
    pas["WEBLib.DesignIntf"].RegisterComponents("New Grid",[pas.GridCustomControl.TVbGrid],null);
  };
});
//# sourceMappingURL=GridCustomControlReg.js.map
