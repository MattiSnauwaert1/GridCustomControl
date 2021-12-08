rtl.module("WEBLib.JSON",["System","Classes","Web","JS","SysUtils"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.$rtti.$Class("TJSONObject");
  this.$rtti.$Class("TJSONString");
  rtl.createClass(this,"TJSONAncestor",pas.System.TObject,function () {
    this.GetStrValue = function () {
      var Result = "";
      Result = "";
      return Result;
    };
    this.SetStrValue = function (Value) {
    };
  });
  rtl.createClass(this,"TJSONValue",this.TJSONAncestor,function () {
    this.$init = function () {
      $mod.TJSONAncestor.$init.call(this);
      this.fjv = undefined;
      this.fjo = undefined;
    };
    this.GetStrValue = function () {
      var Result = "";
      Result = "" + this.fjv;
      return Result;
    };
    this.Create$1 = function (AJSValue) {
      pas.System.TObject.Create.call(this);
      this.fjv = AJSValue;
      return this;
    };
    this.ToString = function () {
      var Result = "";
      Result = JSON.stringify(this.fjv);
      return Result;
    };
  });
  rtl.createClass(this,"TJSONPair",pas.System.TObject,function () {
    this.$init = function () {
      pas.System.TObject.$init.call(this);
      this.fjo = undefined;
      this.fjv = null;
      this.fjs = null;
    };
    this.$final = function () {
      this.fjv = undefined;
      this.fjs = undefined;
      pas.System.TObject.$final.call(this);
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.fjs = $mod.TJSONString.$create("Create");
      return this;
    };
    this.Create$2 = function (Str, Value) {
      pas.System.TObject.Create.call(this);
      this.fjs = $mod.TJSONString.$create("Create$2",[Str]);
      this.fjv = Value;
      return this;
    };
    this.Create$3 = function (Str, Value) {
      pas.System.TObject.Create.call(this);
      this.fjs = $mod.TJSONString.$create("Create$2",[Str]);
      this.fjv = $mod.TJSONString.$create("Create$2",[Value]);
      return this;
    };
    this.Destroy = function () {
      rtl.free(this,"fjs");
      pas.System.TObject.Destroy.call(this);
    };
    this.ToString = function () {
      var Result = "";
      if ($mod.TJSONObject.isPrototypeOf(this.fjv)) {
        Result = '"' + this.fjs.GetStrValue() + '":' + rtl.as(this.fjv,$mod.TJSONObject).ToJSON()}
       else {
        if ((this.fjs !== null) && (this.fjv !== null)) {
          Result = '"' + this.fjs.GetStrValue() + '":' + this.fjv.ToString()}
         else Result = "";
      };
      return Result;
    };
  });
  rtl.createClass(this,"TJSONPairList",pas.Classes.TList,function () {
  });
  rtl.createClass(this,"TJSONObject",this.TJSONValue,function () {
    this.$init = function () {
      $mod.TJSONValue.$init.call(this);
      this.fjo$1 = null;
      this.FMembers = null;
    };
    this.$final = function () {
      this.fjo$1 = undefined;
      this.FMembers = undefined;
      $mod.TJSONValue.$final.call(this);
    };
    this.GetPair = function (I) {
      var Result = null;
      var v = null;
      var l = 0;
      var s = "";
      if ((this.FMembers.GetCount() === 0) && (this.fjo$1 != null) && (rtl.length(Object.keys(this.fjo$1)) > 0)) {
        l = rtl.length(Object.keys(this.fjo$1));
        if (I < l) {
          s = Object.keys(this.fjo$1)[I];
          v = $mod.TJSONValue.$create("Create$1",[this.fjo$1[s]]);
          Result = $mod.TJSONPair.$create("Create$2",[s,v]);
          return Result;
        };
      };
      if ((I >= 0) && (I < this.FMembers.GetCount())) {
        Result = rtl.getObject(this.FMembers.Get(I))}
       else Result = null;
      return Result;
    };
    this.GetCount = function () {
      var Result = 0;
      Result = rtl.length(Object.keys(this.fjo$1));
      return Result;
    };
    this.GetItem = function (Index) {
      var Result = null;
      var jv = undefined;
      jv = this.fjo$1[Object.keys(this.fjo$1)[Index]];
      Result = this.$class.JSONValueFromJS(jv);
      return Result;
    };
    this.SetValues = function (Name, Value) {
      var O = null;
      O = this.fjo$1;
      O[Name] = Value;
    };
    this.AddDescendant = function (Descendent) {
      this.FMembers.Add(Descendent);
    };
    this.JSONValueFromJS = function (AJSValue) {
      var Result = null;
      var d = 0.0;
      Result = null;
      if (rtl.isArray(AJSValue)) {
        Result = $mod.TJSONArray.$create("Create$2");
        rtl.as(Result,$mod.TJSONArray).fja = AJSValue;
      } else if (rtl.isObject(AJSValue)) {
        Result = $mod.TJSONObject.$create("Create$2");
        rtl.as(Result,$mod.TJSONObject).fjo$1 = AJSValue;
      } else if (rtl.isString(AJSValue)) {
        Result = $mod.TJSONString.$create("Create");
        rtl.as(Result,$mod.TJSONString).SetStrValue("" + AJSValue);
      } else if (rtl.isNumber(AJSValue)) {
        Result = $mod.TJSONNumber.$create("Create");
        rtl.as(Result,$mod.TJSONNumber).SetStrValue("" + AJSValue);
        d = rtl.getNumber(AJSValue);
        rtl.as(Result,$mod.TJSONNumber).FDouble = d;
        if (pas.System.Frac(d) === 0) rtl.as(Result,$mod.TJSONNumber).FInt = rtl.trunc(AJSValue);
      } else if (pas.JS.isNull(AJSValue)) {
        Result = $mod.TJSONNull.$create("Create")}
       else if (pas.JS.isBoolean(AJSValue)) {
        if (pas.JS.toBoolean(AJSValue)) {
          Result = $mod.TJSONTrue.$create("Create")}
         else Result = $mod.TJSONFalse.$create("Create");
      };
      if (!(Result != null)) Result = $mod.TJSONNull.$create("Create");
      Result.fjv = AJSValue;
      return Result;
    };
    this.Create$2 = function () {
      pas.System.TObject.Create.call(this);
      this.FMembers = $mod.TJSONPairList.$create("Create$1");
      this.fjo$1 = null;
      return this;
    };
    this.Create$3 = function (AObject) {
      pas.System.TObject.Create.call(this);
      this.FMembers = $mod.TJSONPairList.$create("Create$1");
      this.fjo$1 = AObject;
      return this;
    };
    this.Destroy = function () {
      rtl.free(this,"FMembers");
      pas.System.TObject.Destroy.call(this);
    };
    this.ParseJSONValue = function (data) {
      var Result = null;
      var O = null;
      O = JSON.parse(data);
      Result = this.JSONValueFromJS(O);
      return Result;
    };
    this.GetJSONValue = function (Name) {
      var Result = "";
      var jv = undefined;
      jv = this.fjo$1[Name];
      Result = $impl.JSONObjectToString(jv);
      return Result;
    };
    this.Get = function (Name) {
      var Result = null;
      var jv = undefined;
      var jsv = null;
      var i = 0;
      var p = null;
      Result = null;
      if (this.fjo$1 != null) {
        jv = this.fjo$1[Name];
        if (jv != null) {
          Result = $mod.TJSONPair.$create("Create$1");
          jsv = this.$class.JSONValueFromJS(jv);
          Result.fjo = this.fjo$1;
          Result.fjs.SetStrValue(Name);
          Result.fjv = jsv;
        };
      } else {
        for (var $l = 0, $end = this.FMembers.GetCount() - 1; $l <= $end; $l++) {
          i = $l;
          p = rtl.getObject(this.FMembers.Get(i));
          if (p.fjs.ToString() === ('"' + Name + '"')) Result = p;
        };
      };
      return Result;
    };
    this.Get$1 = function (Index) {
      var Result = null;
      Result = this.Get(Object.keys(this.fjo$1)[Index]);
      return Result;
    };
    this.GetValue$1 = function (Name) {
      var Result = null;
      var jp = null;
      Result = null;
      jp = this.Get(Name);
      if (jp != null) {
        Result = jp.fjv;
        Result.fjo = jp.fjo;
      };
      return Result;
    };
    this.SetValue = function (Name, AValue) {
      var O = null;
      O = this.fjo$1;
      O[Name] = AValue;
    };
    this.SetValue$1 = function (Name, AValue) {
      var O = null;
      O = this.fjo$1;
      O[Name] = AValue;
    };
    this.SetValue$2 = function (Name, AValue) {
      var O = null;
      O = this.fjo$1;
      O[Name] = AValue;
    };
    this.AddPair = function (Pair) {
      var Result = null;
      var LObj = null;
      var o = null;
      if (Pair != null) {
        this.AddDescendant(Pair);
        if (this.fjo$1 != null) {
          o = this.fjo$1;
          o[Pair.fjs.FValue] = Pair.fjv.fjv;
        };
        LObj = this.$class.ParseJSONValue(this.ToJSON());
      };
      Result = LObj;
      return Result;
    };
    this.AddPair$1 = function (Str, Val) {
      var Result = null;
      this.AddPair($mod.TJSONPair.$create("Create$2",[Str,Val]));
      Result = this;
      return Result;
    };
    this.AddPair$2 = function (Str, Val) {
      var Result = null;
      this.AddPair($mod.TJSONPair.$create("Create$3",[Str,Val]));
      Result = this;
      return Result;
    };
    this.AddPair$3 = function (Str, Val) {
      var Result = null;
      this.AddPair($mod.TJSONPair.$create("Create$2",[Str,$mod.TJSONNumber.$create("Create$3",[Val])]));
      Result = this;
      return Result;
    };
    this.ToJSON = function () {
      var Result = "";
      var s = "";
      var Size = 0;
      var I = 0;
      var jp = null;
      if (this.fjo$1 != null) {
        Size = this.GetCount()}
       else Size = this.FMembers.GetCount();
      if ($mod.TJSONArray.isPrototypeOf(this)) {
        Result = rtl.as(this,$mod.TJSONArray).ToString();
      } else {
        s = "{";
        if (Size > 0) {
          if (this.fjo$1 != null) {
            jp = this.Get$1(0);
            if (jp != null) s = s + jp.ToString();
          } else s = s + rtl.getObject(this.FMembers.Get(0)).ToString();
        };
        for (var $l = 1, $end = Size - 1; $l <= $end; $l++) {
          I = $l;
          if (this.fjo$1 != null) {
            jp = this.Get$1(I);
            if (jp != null) {
              s = s + "," + jp.ToString()}
             else s = s + "," + '"' + Object.keys(this.fjo$1)[I] + '":null';
          } else s = s + "," + rtl.getObject(this.FMembers.Get(I)).ToString();
        };
        s = s + "}";
        Result = s;
      };
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.ToJSON();
      return Result;
    };
  });
  rtl.createClass(this,"TJSONString",this.TJSONValue,function () {
    this.$init = function () {
      $mod.TJSONValue.$init.call(this);
      this.FValue = "";
    };
    this.GetStrValue = function () {
      var Result = "";
      Result = this.FValue;
      return Result;
    };
    this.SetStrValue = function (Value) {
      this.FValue = Value;
      this.fjv = Value;
      if (pas.System.Assigned(this.fjo)) {
        var s = Object.keys(this.fjo)[0];
        this.fjo[s] = Value;
      };
    };
    this.Create$2 = function (AString) {
      pas.System.TObject.Create.call(this);
      this.fjv = AString;
      this.FValue = AString;
      return this;
    };
  });
  rtl.createClass(this,"TJSONNumber",this.TJSONString,function () {
    this.$init = function () {
      $mod.TJSONString.$init.call(this);
      this.FInt = 0;
      this.FDouble = 0.0;
    };
    this.GetStrValue = function () {
      var Result = "";
      Result = pas.SysUtils.FloatToStr(this.FDouble);
      return Result;
    };
    this.SetStrValue = function (Value) {
      this.FDouble = pas.SysUtils.StrToFloat(Value);
      if (pas.System.Frac(this.FDouble) === 0) {
        if (!pas.SysUtils.TryStrToInt(Value,{p: this, get: function () {
            return this.p.FInt;
          }, set: function (v) {
            this.p.FInt = v;
          }})) this.FInt = 0;
        this.fjv = this.FInt;
      } else this.fjv = this.FDouble;
    };
    this.Create$3 = function (ANumber) {
      pas.System.TObject.Create.call(this);
      this.fjv = ANumber;
      return this;
    };
    this.Create$4 = function (ANumber) {
      pas.System.TObject.Create.call(this);
      this.fjv = ANumber;
      return this;
    };
  });
  rtl.createClass(this,"TJSONTrue",this.TJSONValue,function () {
    this.GetStrValue = function () {
      var Result = "";
      Result = "true";
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.GetStrValue();
      return Result;
    };
  });
  rtl.createClass(this,"TJSONFalse",this.TJSONValue,function () {
    this.GetStrValue = function () {
      var Result = "";
      Result = "false";
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.GetStrValue();
      return Result;
    };
  });
  rtl.createClass(this,"TJSONNull",this.TJSONValue,function () {
    this.GetStrValue = function () {
      var Result = "";
      Result = "null";
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.GetStrValue();
      return Result;
    };
  });
  rtl.createClass(this,"TJSONArray",this.TJSONObject,function () {
    this.$init = function () {
      $mod.TJSONObject.$init.call(this);
      this.fja = null;
    };
    this.$final = function () {
      this.fja = undefined;
      $mod.TJSONObject.$final.call(this);
    };
    this.GetItem$1 = function (index) {
      var Result = null;
      var jv = undefined;
      jv = this.GetJA()[index];
      if (rtl.isExt(jv,$mod.TJSONObject,1) || rtl.isExt(jv,$mod.TJSONArray,1)) {
        Result = rtl.getObject(jv)}
       else Result = this.$class.JSONValueFromJS(jv);
      return Result;
    };
    this.SetItem = function (index, Value) {
      if ($mod.TJSONObject.isPrototypeOf(Value)) this.GetJA()[index] = Value.fjo$1;
    };
    this.GetCount$1 = function () {
      var Result = 0;
      Result = this.GetJA().length;
      return Result;
    };
    this.GetJA = function () {
      var Result = null;
      if (!(this.fja != null)) this.fja = new Array();
      Result = this.fja;
      return Result;
    };
    this.Create$4 = function (AArray) {
      $mod.TJSONObject.Create$2.call(this);
      this.fja = AArray;
      return this;
    };
    this.Add = function (Element) {
      this.GetJA().push(Element);
    };
    this.Add$1 = function (Element) {
      this.GetJA().push(Element);
    };
    this.Add$2 = function (Element) {
      this.GetJA().push(Element);
    };
    this.Add$3 = function (Element) {
      this.GetJA().push(Element);
    };
    this.Add$4 = function (Element) {
      this.GetJA().push(Element);
    };
    this.Add$5 = function (Element) {
      this.GetJA().push(Element);
    };
    this.ToString = function () {
      var Result = "";
      var i = 0;
      var jv = null;
      var comma = "";
      Result = "[";
      comma = "";
      for (var $l = 0, $end = this.GetCount$1() - 1; $l <= $end; $l++) {
        i = $l;
        jv = this.GetItem$1(i);
        if (jv != null) {
          if ($mod.TJSONObject.isPrototypeOf(jv)) {
            Result = Result + comma + rtl.as(jv,$mod.TJSONObject).ToString();
          } else Result = Result + comma + jv.ToString();
          comma = ",";
        };
      };
      Result = Result + "]";
      return Result;
    };
  });
  rtl.createClass(this,"TJSON",pas.System.TObject,function () {
    this.Parse = function (s) {
      var Result = null;
      var O = null;
      O = JSON.parse(s);
      if (rtl.isArray(O)) {
        Result = $mod.TJSONArray.$create("Create$4",[O]);
      } else {
        Result = $mod.TJSONObject.$create("Create$3",[O]);
      };
      return Result;
    };
  });
  $mod.$implcode = function () {
    $impl.JSONObjectToString = function (v) {
      return v+"";
    };
  };
},[]);
//# sourceMappingURL=WEBLib.JSON.js.map
