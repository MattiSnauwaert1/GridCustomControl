rtl.module("GridCustomControl",["System","Classes","SysUtils","Types","WEBLib.Controls","WEBLib.StdCtrls","WEBLib.Graphics","WEBLib.Dialogs","Web","JS"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass(this,"TColumnItem",pas.Classes.TCollectionItem,function () {
    this.$init = function () {
      pas.Classes.TCollectionItem.$init.call(this);
      this.FColumn = "";
    };
    this.Assign$1 = function (Source) {
      if ($mod.TColumnItem.isPrototypeOf(Source)) {
        this.FColumn = rtl.as(Source,$mod.TColumnItem).FColumn;
      };
    };
    var $r = this.$rtti;
    $r.addProperty("Column",0,rtl.string,"FColumn","FColumn");
  });
  rtl.createClass(this,"TColumns",pas.Classes.TOwnedCollection,function () {
    this.GetItem$1 = function (Index) {
      var Result = null;
      Result = this.GetItem(Index);
      return Result;
    };
    this.SetItem$1 = function (Index, Value) {
      this.SetItem(Index,Value);
    };
    this.Create$3 = function (AOwner) {
      pas.Classes.TOwnedCollection.Create$2.call(this,AOwner,$mod.TColumnItem);
      return this;
    };
    this.Add$1 = function () {
      var Result = null;
      Result = pas.Classes.TCollection.Add.call(this);
      return Result;
    };
    this.Insert$1 = function (Index) {
      var Result = null;
      Result = pas.Classes.TCollection.Insert.call(this,Index);
      return Result;
    };
  });
  rtl.createClass(this,"TVbGrid",pas["WEBLib.Controls"].TCustomControl,function () {
    this.$init = function () {
      pas["WEBLib.Controls"].TCustomControl.$init.call(this);
      this.gridDiv = null;
      this.FPadding = 0;
      this.FMargin = 0;
      this.FColCount = 0;
      this.FColumns = null;
      this.testGetColumns = null;
    };
    this.$final = function () {
      this.gridDiv = undefined;
      this.FColumns = undefined;
      this.testGetColumns = undefined;
      pas["WEBLib.Controls"].TCustomControl.$final.call(this);
    };
    this.SetMargin = function (Value) {
      if (this.FMargin !== Value) {
        this.FMargin = Value;
        this.UpdateElementVisual();
      };
    };
    this.SetPadding = function (Value) {
      if (this.FPadding !== Value) {
        this.FPadding = Value;
        this.UpdateElementVisual();
      };
    };
    this.CreateElement = function () {
      var Result = null;
      Result = document.createElement("DIV");
      this.gridDiv = document.createElement("DIV");
      Result.appendChild(this.gridDiv);
      this.UpdateElement();
      return Result;
    };
    this.UpdateElement = function () {
      this.AddControlScriptLink("https:\/\/unpkg.com\/gridjs\/dist\/gridjs.umd.js");
    };
    this.UpdateElementVisual = function () {
      var strpadding = "";
      pas["WEBLib.Controls"].TCustomControl.UpdateElementVisual.call(this);
      if (this.GetElementHandle() != null) {
        strpadding = pas.SysUtils.IntToStr(this.FPadding) + "px";
        this.GetElementHandle().style.setProperty("padding",strpadding);
      };
    };
    this.SetColCount = function (Value) {
      var delta = 0;
      if ((this.FColCount !== Value) && (Value >= 0)) {
        delta = Value - this.FColCount;
        this.FColCount = Value;
      };
    };
    this.SetColumns = function (Value) {
      this.FColumns.Assign(Value);
    };
    this.CreateInitialize = function () {
      pas["WEBLib.Controls"].TCustomControl.CreateInitialize.call(this);
      this.FPadding = 5;
      this.FMargin = 10;
      this.SetHeight(100);
      this.SetWidth(550);
      this.FColumns = $mod.TColumns.$create("Create$3",[this]);
    };
    this.Create$4 = function (AOwner) {
      pas["WEBLib.Controls"].TControl.Create$1.apply(this,arguments);
      return this;
    };
    this.Destroy = function () {
      rtl.free(this,"FColumns");
      pas["WEBLib.Controls"].TCustomControl.Destroy.call(this);
    };
    this.OpenGrid = function () {
      new gridjs.Grid().updateConfig({
          columns: this.FColumns
          ,
      
          data: [
            [list[0], list[1], "(353) 01 222 3333"],
            ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
            ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
            ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
            ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
          ],
          pagination : {
              limit : 3
          },
          search: {
              enabled: true
          },
          sort: true,
            style: {
          table: {
            'font-size': '15px',
            border: '2px solid #ccc'
          },
          th: {
            'background-color': 'rgba(0, 0, 0, 0.1)',
             color: '#000',
            'border-bottom': '1px solid #fff',
            'text-align': 'center'
          },
          td: {
            'text-align': 'center'
          }
        }
        // Aangezien we hier in een asm-blok bevinden en het delphi 'gridDiv' variable willen aanspreken, moeten we gebruiken maken van
        // de 'this' functionaliteit
        }).render(this.gridDiv);
      this.SetColCount(this.FColCount);
    };
    rtl.addIntf(this,pas.System.IUnknown);
    var $r = this.$rtti;
    $r.addProperty("Margin",2,rtl.longint,"FMargin","SetMargin");
    $r.addProperty("Padding",2,rtl.longint,"FPadding","SetPadding");
    $r.addProperty("Columns",2,$mod.$rtti["TColumns"],"FColumns","SetColumns");
  });
});
//# sourceMappingURL=GridCustomControl.js.map
