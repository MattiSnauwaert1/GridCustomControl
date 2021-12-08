rtl.module("WEBLib.Utils",["System","Types","Web","SysUtils","Math","Classes","JS"],function () {
  "use strict";
  var $mod = this;
  var $impl = $mod.$impl;
  this.DayMonday = 1;
  this.DayTuesday = 2;
  this.DayWednesday = 3;
  this.DayThursday = 4;
  this.DayFriday = 5;
  this.DaySaturday = 6;
  this.DaySunday = 7;
  this.MonthJanuary = 1;
  this.MonthFebruary = 2;
  this.MonthMarch = 3;
  this.MonthApril = 4;
  this.MonthMay = 5;
  this.MonthJune = 6;
  this.MonthJuly = 7;
  this.MonthAugust = 8;
  this.MonthSeptember = 9;
  this.MonthOctober = 10;
  this.MonthNovember = 11;
  this.MonthDecember = 12;
  this.$rtti.$Class("TInterfaceList");
  this.$rtti.$RefToProcVar("TProc",{procsig: rtl.newTIProcSig([])});
  this.$rtti.$RefToProcVar("TProcBoolean",{procsig: rtl.newTIProcSig([["AValue",rtl.boolean]])});
  this.$rtti.$RefToProcVar("TProcInteger",{procsig: rtl.newTIProcSig([["AValue",rtl.longint]])});
  rtl.createClass(this,"EConvertError",pas.SysUtils.Exception,function () {
  });
  rtl.createClass(this,"EEncodingError",pas.SysUtils.Exception,function () {
  });
  rtl.createClass(this,"EStreamError",pas.SysUtils.Exception,function () {
  });
  rtl.createClass(this,"EStringStreamError",this.EStreamError,function () {
  });
  rtl.createClass(this,"EFilerError",this.EStreamError,function () {
  });
  rtl.createClass(this,"EReadError",this.EFilerError,function () {
  });
  rtl.createClass(this,"EWriteError",this.EFilerError,function () {
  });
  rtl.createHelper(this,"TBytesHelper",null,function () {
    this.get_Length = function () {
      var Result = 0;
      Result = rtl.length(this.get());
      return Result;
    };
    this.set_Length = function (AValue) {
      this.set(rtl.arraySetLength(this.get(),0,AValue));
    };
    this.Compare = function (ARight) {
      var Result = 0;
      var lCount = 0;
      if ($mod.TBytesHelper.get_Length.call(this) > $mod.TBytesHelper.get_Length.call({get: function () {
          return ARight;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) return 1;
      if ($mod.TBytesHelper.get_Length.call(this) < $mod.TBytesHelper.get_Length.call({get: function () {
          return ARight;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) return -1;
      Result = 0;
      for (var $l = $mod.TBytesHelper.Low.call(this), $end = $mod.TBytesHelper.High.call(this); $l <= $end; $l++) {
        lCount = $l;
        if (this.get()[lCount] > ARight[lCount]) return 1;
        if (this.get()[lCount] < ARight[lCount]) return -1;
      };
      return Result;
    };
    this.High = function () {
      var Result = 0;
      Result = rtl.length(this.get()) - 1;
      return Result;
    };
    this.Low = function () {
      var Result = 0;
      Result = 0;
      return Result;
    };
    this.SubBytes = function (AStartIndex) {
      var Result = [];
      Result = rtl.arrayCopy(0,this.get(),AStartIndex,$mod.TBytesHelper.get_Length.call(this));
      return Result;
    };
    this.SubBytes$1 = function (AStartIndex, ALength) {
      var Result = [];
      Result = rtl.arrayCopy(0,this.get(),AStartIndex,ALength);
      return Result;
    };
  });
  this.$rtti.$DynArray("TWords",{eltype: rtl.word});
  rtl.createHelper(this,"TWordsHelper",null,function () {
    this.get_Length = function () {
      var Result = 0;
      Result = rtl.length(this.get());
      return Result;
    };
    this.set_Length = function (AValue) {
      this.set(rtl.arraySetLength(this.get(),0,AValue));
    };
    var cBytesPerWord = 2;
    this.FromBytes = function (ABytes) {
      var Result = [];
      var lCount = 0;
      var lLow = 0;
      var lHigh = 0;
      lCount = $mod.TBytesHelper.get_Length.call({get: function () {
          return ABytes;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }});
      if (pas.System.Odd(lCount)) lCount += 1;
      $mod.TWordsHelper.set_Length.call({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},rtl.trunc(lCount / 2));
      lCount = $mod.TBytesHelper.Low.call({get: function () {
          return ABytes;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }});
      while (lCount <= $mod.TBytesHelper.High.call({get: function () {
          return ABytes;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) {
        lLow = ABytes[lCount];
        if ((lCount + 1) <= $mod.TBytesHelper.High.call({get: function () {
            return ABytes;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }})) {
          lHigh = ABytes[lCount + 1]}
         else lHigh = 0;
        Result[rtl.trunc(lCount / 2)] = $mod.TWordHelper.FromBytes(lLow,lHigh);
        lCount += 2;
      };
      return Result;
    };
    this.High = function () {
      var Result = 0;
      Result = rtl.length(this.get()) - 1;
      return Result;
    };
    this.Low = function () {
      var Result = 0;
      Result = 0;
      return Result;
    };
    var cBytesPerWord$1 = 2;
    this.ToBytes = function () {
      var Result = [];
      var lLow = 0;
      var lHigh = 0;
      var lCount = 0;
      var lNewIndex = 0;
      $mod.TBytesHelper.set_Length.call({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},$mod.TWordsHelper.get_Length.call(this) * 2);
      for (var $l = $mod.TWordsHelper.Low.call(this), $end = $mod.TWordsHelper.High.call(this); $l <= $end; $l++) {
        lCount = $l;
        $mod.TWordHelper.ToBytes.call({a: lCount, p: this.get(), get: function () {
            return this.p[this.a];
          }, set: function (v) {
            this.p[this.a] = v;
          }},{get: function () {
            return lLow;
          }, set: function (v) {
            lLow = v;
          }},{get: function () {
            return lHigh;
          }, set: function (v) {
            lHigh = v;
          }});
        lNewIndex = lCount * 2;
        Result[lNewIndex] = lLow;
        Result[lNewIndex + 1] = lHigh;
      };
      return Result;
    };
  });
  rtl.createHelper(this,"TCharHelper",null,function () {
    this.Length = 1;
    this.Size = 2;
    var cNumChars = rtl.createSet(48,49,50,51,52,53,54,55,56,57);
    this.IsDigit = function () {
      var Result = false;
      Result = this.get().charCodeAt() in cNumChars;
      return Result;
    };
    this.ToOrd = function () {
      var Result = 0;
      Result = this.get().charCodeAt();
      return Result;
    };
    this.ToUpper = function () {
      var Result = "";
      Result = $mod.TCharHelper.ToUpper$1(this.get());
      return Result;
    };
    this.ToUpper$1 = function (AValue) {
      return AValue.toUpperCase();
    };
  });
  rtl.createHelper(this,"TIntegerHelper",null,function () {
    this.Equals = function (AValue) {
      var Result = false;
      Result = this.get() === AValue;
      return Result;
    };
    this.NotEquals = function (AValue) {
      var Result = false;
      Result = !$mod.TIntegerHelper.Equals.call(this,AValue);
      return Result;
    };
    this.Parse = function (AValue) {
      var Result = 0;
      Result = pas.SysUtils.StrToInt(AValue);
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = $mod.TIntegerHelper.ToString$1(this.get());
      return Result;
    };
    this.ToString$1 = function (AValue) {
      return AValue.toString();
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      Result = pas.SysUtils.TryStrToInt(AString,AValue);
      return Result;
    };
  });
  rtl.createHelper(this,"TLongIntHelper",null,function () {
    this.Equals = function (AValue) {
      var Result = false;
      Result = this.get() === AValue;
      return Result;
    };
    this.NotEquals = function (AValue) {
      var Result = false;
      Result = !$mod.TLongIntHelper.Equals.call(this,AValue);
      return Result;
    };
    this.Parse = function (AValue) {
      var Result = 0;
      Result = pas.SysUtils.StrToInt(AValue);
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = $mod.TLongIntHelper.ToString$1(this.get());
      return Result;
    };
    this.ToString$1 = function (AValue) {
      return AValue.toString();
    };
    this.TryParse = function (AString, AValue) {
      var Result = false;
      Result = pas.SysUtils.TryStrToInt(AString,AValue);
      return Result;
    };
  });
  rtl.createHelper(this,"TWordHelper",null,function () {
    var cBitPerByte = 8;
    this.FromBytes = function (ALow, AHigh) {
      var Result = 0;
      Result = ALow + (AHigh << 8);
      return Result;
    };
    var cMask = 0xFF;
    var cBitPerByte$1 = 8;
    this.ToBytes = function (ALow, AHigh) {
      ALow.set(this.get() & cMask);
      AHigh.set((this.get() & (cMask << 8)) >>> 8);
    };
  });
  rtl.createHelper(this,"TStringHelper",null,function () {
    this.Empty = "";
    this.get_Chars = function (AIndex) {
      var Result = "";
      Result = this.get().charAt((AIndex + 1) - 1);
      return Result;
    };
    this.get_Length = function () {
      var Result = 0;
      Result = this.get().length;
      return Result;
    };
    this.Pos = function (ASubStr, AStr, AOffset) {
      return AStr.indexOf(ASubStr, AOffset - 1) + 1;
    };
    this.Reverse = function () {
      var Result = "";
      var lCount = 0;
      Result = $mod.TStringHelper.Empty;
      $mod.TStringHelper.set_Length.call({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},$mod.TStringHelper.get_Length.call(this));
      for (var $l = 0, $end = $mod.TStringHelper.get_Length.call(this) - 1; $l <= $end; $l++) {
        lCount = $l;
        $mod.TStringHelper.set_Chars.call({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},$mod.TStringHelper.get_Length.call(this) - lCount - 1,$mod.TStringHelper.get_Chars.call(this,lCount));
      };
      return Result;
    };
    this.set_Chars = function (AIndex, AValue) {
      this.set(rtl.setCharAt(this.get(),(AIndex + 1) - 1,AValue));
    };
    this.set_Length = function (AValue) {
      this.set(rtl.strSetLength(this.get(),AValue));
    };
    this.CompareTo = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.CompareTo$1(this.get(),AValue);
      return Result;
    };
    this.CompareTo$1 = function (ALeft, ARight) {
      return ALeft.localeCompare(ARight);
    };
    this.Contains = function (AValue) {
      var Result = false;
      Result = $mod.TStringHelper.IndexOf$2.call(this,AValue) >= 0;
      return Result;
    };
    this.Equals = function (AValue) {
      var Result = false;
      Result = this.get() === AValue;
      return Result;
    };
    this.FirstChar = function () {
      var Result = "";
      if ($mod.TStringHelper.NotIsEmpty.call(this)) {
        Result = $mod.TStringHelper.get_Chars.call(this,0)}
       else Result = "\x00";
      return Result;
    };
    this.Format = function (AArgs) {
      var Result = "";
      Result = pas.SysUtils.Format(this.get(),AArgs);
      return Result;
    };
    this.Format$1 = function (AValue, AArgs) {
      var Result = "";
      Result = pas.SysUtils.Format(AValue,AArgs);
      return Result;
    };
    this.High = function () {
      var Result = 0;
      Result = $mod.TStringHelper.get_Length.call(this) - 1;
      return Result;
    };
    this.IndexOf = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.Pos.call(this,AValue,this.get(),1) - 1;
      return Result;
    };
    this.IndexOf$1 = function (AValue, AStartIndex, ACount) {
      var Result = 0;
      Result = $mod.TStringHelper.Pos.call(this,AValue,this.get(),AStartIndex + 1) - 1;
      if ((Result + $mod.TStringHelper.get_Length.call({get: function () {
          return AValue;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) > (AStartIndex + ACount)) Result = -1;
      return Result;
    };
    this.IndexOf$2 = function (AValue) {
      var Result = 0;
      Result = pas.System.Pos(AValue,this.get()) - 1;
      return Result;
    };
    this.Insert = function (AStartIndex, AValue) {
      var Result = "";
      pas.System.Insert(AValue,this,AStartIndex + 1);
      Result = this.get();
      return Result;
    };
    this.IsEmpty = function () {
      var Result = false;
      Result = this.get() === $mod.TStringHelper.Empty;
      return Result;
    };
    var cNumbers = rtl.createSet(null,48,57);
    this.IsNumber = function () {
      var Result = false;
      var lCount = 0;
      if ($mod.TStringHelper.IsEmpty.call(this)) return false;
      for (var $l = 0, $end = $mod.TStringHelper.get_Length.call(this) - 1; $l <= $end; $l++) {
        lCount = $l;
        if (!($mod.TStringHelper.get_Chars.call(this,lCount).charCodeAt() in cNumbers)) return false;
      };
      Result = true;
      return Result;
    };
    this.LastIndexOf = function (AValue) {
      var Result = 0;
      Result = $mod.TStringHelper.IndexOf.call({a: $mod.TStringHelper.Reverse.call(this), get: function () {
          return this.a;
        }, set: function (v) {
          this.a = v;
        }},AValue);
      if (Result >= 0) Result = $mod.TStringHelper.get_Length.call(this) - Result - 1;
      return Result;
    };
    this.Low = function () {
      var Result = 0;
      Result = 0;
      return Result;
    };
    this.NotEquals = function (AValue) {
      var Result = false;
      Result = !$mod.TStringHelper.Equals.call(this,AValue);
      return Result;
    };
    this.NotIsEmpty = function () {
      var Result = false;
      Result = this.get() !== $mod.TStringHelper.Empty;
      return Result;
    };
    var cDefPadChar = " ";
    this.PadLeft = function (ATotalWidth) {
      var Result = "";
      Result = $mod.TStringHelper.PadLeft$1.call(this,ATotalWidth,cDefPadChar);
      return Result;
    };
    this.PadLeft$1 = function (ATotalWidth, APaddingChar) {
      var Result = "";
      ATotalWidth = ATotalWidth - $mod.TStringHelper.get_Length.call(this);
      if (ATotalWidth > 0) {
        Result = pas.System.StringOfChar(APaddingChar,ATotalWidth) + this.get()}
       else Result = this.get();
      return Result;
    };
    this.Remove = function (AStartIndex) {
      var Result = "";
      Result = $mod.TStringHelper.Remove$1.call(this,AStartIndex,1);
      return Result;
    };
    this.Remove$1 = function (AStartIndex, ACount) {
      var Result = "";
      Result = $mod.TStringHelper.Substring$1.call(this,0,AStartIndex - 1) + $mod.TStringHelper.Substring.call(this,AStartIndex + ACount);
      return Result;
    };
    this.Replace = function (AOldValue, ANewValue) {
      var Result = "";
      Result = pas.SysUtils.StringReplace(this.get(),AOldValue,ANewValue,rtl.createSet(pas.SysUtils.TStringReplaceFlag.rfReplaceAll));
      return Result;
    };
    this.Same = function (AValue) {
      var Result = false;
      Result = pas.SysUtils.SameText(this.get(),AValue);
      return Result;
    };
    this.StartsText = function (ASubText, AText) {
      var Result = false;
      if ($mod.TStringHelper.IsEmpty.call({get: function () {
          return ASubText;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) {
        Result = true}
       else {
        if ($mod.TStringHelper.get_Length.call({get: function () {
            return AText;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }}) >= $mod.TStringHelper.get_Length.call({get: function () {
            return ASubText;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }})) {
          Result = pas.SysUtils.SameText($mod.TStringHelper.Substring$1.call({get: function () {
              return AText;
            }, set: function (v) {
              rtl.raiseE("EPropReadOnly");
            }},0,$mod.TStringHelper.get_Length.call({get: function () {
              return ASubText;
            }, set: function (v) {
              rtl.raiseE("EPropReadOnly");
            }})),ASubText)}
         else Result = false;
      };
      return Result;
    };
    this.StartsWith = function (AValue) {
      var Result = false;
      Result = $mod.TStringHelper.StartsWith$1.call(this,AValue,false);
      return Result;
    };
    this.StartsWith$1 = function (AValue, AIgnoreCase) {
      var Result = false;
      if (AIgnoreCase) {
        Result = $mod.TStringHelper.StartsText(AValue,this.get())}
       else if (AValue === $mod.TStringHelper.Empty) {
        Result = true}
       else {
        if ($mod.TStringHelper.get_Length.call(this) >= $mod.TStringHelper.get_Length.call({get: function () {
            return AValue;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }})) {
          Result = $mod.TStringHelper.Equals.call({a: $mod.TStringHelper.Substring$1.call(this,0,$mod.TStringHelper.get_Length.call({get: function () {
                return AValue;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }})), get: function () {
              return this.a;
            }, set: function (v) {
              this.a = v;
            }},AValue)}
         else Result = false;
      };
      return Result;
    };
    this.Substring = function (AStartIndex) {
      var Result = "";
      Result = pas.System.Copy(this.get(),AStartIndex + 1,$mod.TStringHelper.get_Length.call(this));
      return Result;
    };
    this.Substring$1 = function (AStartIndex, ALength) {
      var Result = "";
      Result = pas.System.Copy(this.get(),AStartIndex + 1,ALength);
      return Result;
    };
    this.ToLower = function () {
      var Result = "";
      var lValue = "";
      lValue = this.get();
      lValue = lValue.toLowerCase();
      Result = lValue;
      return Result;
    };
    this.ToUpper = function () {
      var Result = "";
      var lValue = "";
      lValue = this.get();
      lValue = lValue.toUpperCase();
      Result = lValue;
      return Result;
    };
    this.Trim = function () {
      var Result = "";
      Result = pas.SysUtils.Trim(this.get());
      return Result;
    };
  });
  rtl.createHelper(this,"TDateTimeHelper",null,function () {
    this.Equals = function (AValue) {
      var Result = false;
      Result = pas.Math.SameValue(this.get(),AValue,0.0);
      return Result;
    };
    this.NotEquals = function (AValue) {
      var Result = false;
      Result = !pas.Math.SameValue(this.get(),AValue,0.0);
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = $mod.DateTimeToStr$1(this.get(),$mod.FormatSettings,false);
      return Result;
    };
  });
  this.$rtti.$StaticArray("TMonthNameArray",{dims: [12], eltype: rtl.string});
  this.$rtti.$StaticArray("TDayNames",{dims: [7], eltype: rtl.string});
  rtl.recNewT(this,"TFormatSettings",function () {
    this.CurrencyDecimals = 0;
    this.CurrencyFormat = 0;
    this.CurrencyString = "";
    this.DateSeparator = "";
    this.DecimalSeparator = "";
    this.LongDateFormat = "";
    this.LongTimeFormat = "";
    this.NegCurrFormat = 0;
    this.ShortDateFormat = "";
    this.ShortTimeFormat = "";
    this.ThousandSeparator = "";
    this.TimeAMString = "";
    this.TimePMString = "";
    this.TimeSeparator = "";
    this.TwoDigitYearCenturyWindow = 0;
    this.$new = function () {
      var r = Object.create(this);
      r.DateTimeToStrFormat = rtl.arraySetLength(null,"",2);
      r.LongDayNames = rtl.arraySetLength(null,"",7);
      r.LongMonthNames = rtl.arraySetLength(null,"",12);
      r.ShortDayNames = rtl.arraySetLength(null,"",7);
      r.ShortMonthNames = rtl.arraySetLength(null,"",12);
      return r;
    };
    this.$eq = function (b) {
      return (this.CurrencyDecimals === b.CurrencyDecimals) && (this.CurrencyFormat === b.CurrencyFormat) && (this.CurrencyString === b.CurrencyString) && (this.DateSeparator === b.DateSeparator) && rtl.arrayEq(this.DateTimeToStrFormat,b.DateTimeToStrFormat) && (this.DecimalSeparator === b.DecimalSeparator) && (this.LongDateFormat === b.LongDateFormat) && rtl.arrayEq(this.LongDayNames,b.LongDayNames) && rtl.arrayEq(this.LongMonthNames,b.LongMonthNames) && (this.LongTimeFormat === b.LongTimeFormat) && (this.NegCurrFormat === b.NegCurrFormat) && (this.ShortDateFormat === b.ShortDateFormat) && rtl.arrayEq(this.ShortDayNames,b.ShortDayNames) && rtl.arrayEq(this.ShortMonthNames,b.ShortMonthNames) && (this.ShortTimeFormat === b.ShortTimeFormat) && (this.ThousandSeparator === b.ThousandSeparator) && (this.TimeAMString === b.TimeAMString) && (this.TimePMString === b.TimePMString) && (this.TimeSeparator === b.TimeSeparator) && (this.TwoDigitYearCenturyWindow === b.TwoDigitYearCenturyWindow);
    };
    this.$assign = function (s) {
      this.CurrencyDecimals = s.CurrencyDecimals;
      this.CurrencyFormat = s.CurrencyFormat;
      this.CurrencyString = s.CurrencyString;
      this.DateSeparator = s.DateSeparator;
      this.DateTimeToStrFormat = s.DateTimeToStrFormat.slice(0);
      this.DecimalSeparator = s.DecimalSeparator;
      this.LongDateFormat = s.LongDateFormat;
      this.LongDayNames = s.LongDayNames.slice(0);
      this.LongMonthNames = s.LongMonthNames.slice(0);
      this.LongTimeFormat = s.LongTimeFormat;
      this.NegCurrFormat = s.NegCurrFormat;
      this.ShortDateFormat = s.ShortDateFormat;
      this.ShortDayNames = s.ShortDayNames.slice(0);
      this.ShortMonthNames = s.ShortMonthNames.slice(0);
      this.ShortTimeFormat = s.ShortTimeFormat;
      this.ThousandSeparator = s.ThousandSeparator;
      this.TimeAMString = s.TimeAMString;
      this.TimePMString = s.TimePMString;
      this.TimeSeparator = s.TimeSeparator;
      this.TwoDigitYearCenturyWindow = s.TwoDigitYearCenturyWindow;
      return this;
    };
    this.GetBrowserLocale = function () {
      return navigator.language;
    };
    this.GetLocaleShortDayName = function (ADayOfWeek, ALocale) {
      var lBaseDate = new Date(2017, 0, 1); // Sunday
        lBaseDate.setDate(lBaseDate.getDate() + ADayOfWeek - 1);
      
        var lLoc = "";
        if (ALocale == '')
          lLoc = navigator.language
        else
          lLoc = ALocale;
      
        return lBaseDate.toLocaleDateString(lLoc, { weekday: 'short' });
    };
    this.GetLocaleDecimalSeparator = function (ALocale) {
      var lNumber = 1.1;
      lNumber = lNumber.toLocaleString(ALocale).substring(1, 2);
      return lNumber;
    };
    this.GetLocaleLongMonthName = function (AMonth, ALocale) {
      var lBaseDate = new Date(2017, AMonth - 1, 1);
      return lBaseDate.toLocaleDateString(ALocale, { month: 'long' });
    };
    this.GetLocaleLongDayName = function (ADayOfWeek, ALocale) {
      var lBaseDate = new Date(2017, 0, 1); // Sunday
      lBaseDate.setDate(lBaseDate.getDate() + ADayOfWeek - 1);
      return lBaseDate.toLocaleDateString(ALocale, { weekday: 'long' });
    };
    this.GetLocaleShortMonthName = function (AMonth, ALocale) {
      var lBaseDate = new Date(2017, AMonth - 1, 1);
      var lLoc = "";
      if (ALocale == '')
        lLoc = navigator.language
      else
        lLoc = ALocale;
      return lBaseDate.toLocaleDateString(lLoc, { month: 'short' });
    };
    this.GetLocaleLongTimeFormat = function (ALocale) {
      var Result = "";
      Result = "hh:nn:ss";
      if (pas.SysUtils.UpperCase(ALocale) === "EN-US") Result = "hh:nn:ss AMPM";
      return Result;
    };
    this.GetLocaleShortTimeFormat = function (ALocale) {
      var Result = "";
      Result = "hh:nn";
      if (pas.SysUtils.UpperCase(ALocale) === "EN-US") Result = "h:nn AMPM";
      return Result;
    };
    var cDeli = "-";
    var cShortLength = 2;
    this.GetLocaleShortDateFormat = function (ALocale) {
      var Result = "";
      var lIndex = 0;
      var res = "";
      res = $mod.TStringHelper.Empty;
      ALocale = $mod.TStringHelper.ToLower.call({get: function () {
          return ALocale;
        }, set: function (v) {
          ALocale = v;
        }});
      lIndex = $mod.TStringHelper.IndexOf.call({get: function () {
          return ALocale;
        }, set: function (v) {
          ALocale = v;
        }},cDeli);
      if (lIndex >= 0) {
        ALocale = $mod.TStringHelper.Substring$1.call({get: function () {
            return ALocale;
          }, set: function (v) {
            ALocale = v;
          }},0,lIndex) + $mod.TStringHelper.ToUpper.call({a: $mod.TStringHelper.Substring.call({get: function () {
              return ALocale;
            }, set: function (v) {
              ALocale = v;
            }},lIndex), get: function () {
            return this.a;
          }, set: function (v) {
            this.a = v;
          }})}
       else {
        if ($mod.TStringHelper.get_Length.call({get: function () {
            return ALocale;
          }, set: function (v) {
            ALocale = v;
          }}) === 2) ALocale = ALocale + cDeli + $mod.TStringHelper.ToUpper.call({get: function () {
            return ALocale;
          }, set: function (v) {
            ALocale = v;
          }});
      };
      var lFormats = {
        "ar-SA" : "dd/MM/yy",
        "bg-BG" : "dd.M.yyyy",
        "ca-ES" : "dd/MM/yyyy",
        "zh-TW" : "yyyy/M/d",
        "cs-CZ" : "d.M.yyyy",
        "da-DK" : "dd-MM-yyyy",
        "de-DE" : "dd.MM.yyyy",
        "el-GR" : "d/M/yyyy",
        "en-US" : "M/d/yyyy",
        "fi-FI" : "d.M.yyyy",
        "fr-FR" : "dd/MM/yyyy",
        "he-IL" : "dd/MM/yyyy",
        "hu-HU" : "yyyy. MM. dd.",
        "is-IS" : "d.M.yyyy",
        "it-IT" : "dd/MM/yyyy",
        "ja-JP" : "yyyy/MM/dd",
        "ko-KR" : "yyyy-MM-dd",
        "nl-NL" : "d-M-yyyy",
        "nb-NO" : "dd.MM.yyyy",
        "pl-PL" : "yyyy-MM-dd",
        "pt-BR" : "d/M/yyyy",
        "ro-RO" : "dd.MM.yyyy",
        "ru-RU" : "dd.MM.yyyy",
        "hr-HR" : "d.M.yyyy",
        "sk-SK" : "d. M. yyyy",
        "sq-AL" : "yyyy-MM-dd",
        "sv-SE" : "yyyy-MM-dd",
        "th-TH" : "d/M/yyyy",
        "tr-TR" : "dd.MM.yyyy",
        "ur-PK" : "dd/MM/yyyy",
        "id-ID" : "dd/MM/yyyy",
        "uk-UA" : "dd.MM.yyyy",
        "be-BY" : "dd.MM.yyyy",
        "sl-SI" : "d.M.yyyy",
        "et-EE" : "d.MM.yyyy",
        "lv-LV" : "yyyy.MM.dd.",
        "lt-LT" : "yyyy.MM.dd",
        "fa-IR" : "MM/dd/yyyy",
        "vi-VN" : "dd/MM/yyyy",
        "hy-AM" : "dd.MM.yyyy",
        "az-Latn-AZ" : "dd.MM.yyyy",
        "eu-ES" : "yyyy/MM/dd",
        "mk-MK" : "dd.MM.yyyy",
        "af-ZA" : "yyyy/MM/dd",
        "ka-GE" : "dd.MM.yyyy",
        "fo-FO" : "dd-MM-yyyy",
        "hi-IN" : "dd-MM-yyyy",
        "ms-MY" : "dd/MM/yyyy",
        "kk-KZ" : "dd.MM.yyyy",
        "ky-KG" : "dd.MM.yy",
        "sw-KE" : "M/d/yyyy",
        "uz-Latn-UZ" : "dd/MM yyyy",
        "tt-RU" : "dd.MM.yyyy",
        "pa-IN" : "dd-MM-yy",
        "gu-IN" : "dd-MM-yy",
        "ta-IN" : "dd-MM-yyyy",
        "te-IN" : "dd-MM-yy",
        "kn-IN" : "dd-MM-yy",
        "mr-IN" : "dd-MM-yyyy",
        "sa-IN" : "dd-MM-yyyy",
        "mn-MN" : "yy.MM.dd",
        "gl-ES" : "dd/MM/yy",
        "kok-IN" : "dd-MM-yyyy",
        "syr-SY" : "dd/MM/yyyy",
        "dv-MV" : "dd/MM/yy",
        "ar-IQ" : "dd/MM/yyyy",
        "zh-CN" : "yyyy/M/d",
        "de-CH" : "dd.MM.yyyy",
        "en-GB" : "dd/MM/yyyy",
        "es-MX" : "dd/MM/yyyy",
        "fr-BE" : "d/MM/yyyy",
        "it-CH" : "dd.MM.yyyy",
        "nl-BE" : "d/MM/yyyy",
        "nn-NO" : "dd.MM.yyyy",
        "pt-PT" : "dd-MM-yyyy",
        "sr-Latn-CS" : "d.M.yyyy",
        "sv-FI" : "d.M.yyyy",
        "az-Cyrl-AZ" : "dd.MM.yyyy",
        "ms-BN" : "dd/MM/yyyy",
        "uz-Cyrl-UZ" : "dd.MM.yyyy",
        "ar-EG" : "dd/MM/yyyy",
        "zh-HK" : "d/M/yyyy",
        "de-AT" : "dd.MM.yyyy",
        "en-AU" : "d/MM/yyyy",
        "es-ES" : "dd/MM/yyyy",
        "fr-CA" : "yyyy-MM-dd",
        "sr-Cyrl-CS" : "d.M.yyyy",
        "ar-LY" : "dd/MM/yyyy",
        "zh-SG" : "d/M/yyyy",
        "de-LU" : "dd.MM.yyyy",
        "en-CA" : "dd/MM/yyyy",
        "es-GT" : "dd/MM/yyyy",
        "fr-CH" : "dd.MM.yyyy",
        "ar-DZ" : "dd-MM-yyyy",
        "zh-MO" : "d/M/yyyy",
        "de-LI" : "dd.MM.yyyy",
        "en-NZ" : "d/MM/yyyy",
        "es-CR" : "dd/MM/yyyy",
        "fr-LU" : "dd/MM/yyyy",
        "ar-MA" : "dd-MM-yyyy",
        "en-IE" : "dd/MM/yyyy",
        "es-PA" : "MM/dd/yyyy",
        "fr-MC" : "dd/MM/yyyy",
        "ar-TN" : "dd-MM-yyyy",
        "en-ZA" : "yyyy/MM/dd",
        "es-DO" : "dd/MM/yyyy",
        "ar-OM" : "dd/MM/yyyy",
        "en-JM" : "dd/MM/yyyy",
        "es-VE" : "dd/MM/yyyy",
        "ar-YE" : "dd/MM/yyyy",
        "en-029" : "MM/dd/yyyy",
        "es-CO" : "dd/MM/yyyy",
        "ar-SY" : "dd/MM/yyyy",
        "en-BZ" : "dd/MM/yyyy",
        "es-PE" : "dd/MM/yyyy",
        "ar-JO" : "dd/MM/yyyy",
        "en-TT" : "dd/MM/yyyy",
        "es-AR" : "dd/MM/yyyy",
        "ar-LB" : "dd/MM/yyyy",
        "en-ZW" : "M/d/yyyy",
        "es-EC" : "dd/MM/yyyy",
        "ar-KW" : "dd/MM/yyyy",
        "en-PH" : "M/d/yyyy",
        "es-CL" : "dd-MM-yyyy",
        "ar-AE" : "dd/MM/yyyy",
        "es-UY" : "dd/MM/yyyy",
        "ar-BH" : "dd/MM/yyyy",
        "es-PY" : "dd/MM/yyyy",
        "ar-QA" : "dd/MM/yyyy",
        "es-BO" : "dd/MM/yyyy",
        "es-SV" : "dd/MM/yyyy",
        "es-HN" : "dd/MM/yyyy",
        "es-NI" : "dd/MM/yyyy",
        "es-PR" : "dd/MM/yyyy",
        "am-ET" : "d/M/yyyy",
        "tzm-Latn-DZ" : "dd-MM-yyyy",
        "iu-Latn-CA" : "d/MM/yyyy",
        "sma-NO" : "dd.MM.yyyy",
        "mn-Mong-CN" : "yyyy/M/d",
        "gd-GB" : "dd/MM/yyyy",
        "en-MY" : "d/M/yyyy",
        "prs-AF" : "dd/MM/yy",
        "bn-BD" : "dd-MM-yy",
        "wo-SN" : "dd/MM/yyyy",
        "rw-RW" : "M/d/yyyy",
        "qut-GT" : "dd/MM/yyyy",
        "sah-RU" : "MM.dd.yyyy",
        "gsw-FR" : "dd/MM/yyyy",
        "co-FR" : "dd/MM/yyyy",
        "oc-FR" : "dd/MM/yyyy",
        "mi-NZ" : "dd/MM/yyyy",
        "ga-IE" : "dd/MM/yyyy",
        "se-SE" : "yyyy-MM-dd",
        "br-FR" : "dd/MM/yyyy",
        "smn-FI" : "d.M.yyyy",
        "moh-CA" : "M/d/yyyy",
        "arn-CL" : "dd-MM-yyyy",
        "ii-CN" : "yyyy/M/d",
        "dsb-DE" : "d. M. yyyy",
        "ig-NG" : "d/M/yyyy",
        "kl-GL" : "dd-MM-yyyy",
        "lb-LU" : "dd/MM/yyyy",
        "ba-RU" : "dd.MM.yy",
        "nso-ZA" : "yyyy/MM/dd",
        "quz-BO" : "dd/MM/yyyy",
        "yo-NG" : "d/M/yyyy",
        "ha-Latn-NG" : "d/M/yyyy",
        "fil-PH" : "M/d/yyyy",
        "ps-AF" : "dd/MM/yy",
        "fy-NL" : "d-M-yyyy",
        "ne-NP" : "M/d/yyyy",
        "se-NO" : "dd.MM.yyyy",
        "iu-Cans-CA" : "d/M/yyyy",
        "sr-Latn-RS" : "d.M.yyyy",
        "si-LK" : "yyyy-MM-dd",
        "sr-Cyrl-RS" : "d.M.yyyy",
        "lo-LA" : "dd/MM/yyyy",
        "km-KH" : "yyyy-MM-dd",
        "cy-GB" : "dd/MM/yyyy",
        "bo-CN" : "yyyy/M/d",
        "sms-FI" : "d.M.yyyy",
        "as-IN" : "dd-MM-yyyy",
        "ml-IN" : "dd-MM-yy",
        "en-IN" : "dd-MM-yyyy",
        "or-IN" : "dd-MM-yy",
        "bn-IN" : "dd-MM-yy",
        "tk-TM" : "dd.MM.yy",
        "bs-Latn-BA" : "d.M.yyyy",
        "mt-MT" : "dd/MM/yyyy",
        "sr-Cyrl-ME" : "d.M.yyyy",
        "se-FI" : "d.M.yyyy",
        "zu-ZA" : "yyyy/MM/dd",
        "xh-ZA" : "yyyy/MM/dd",
        "tn-ZA" : "yyyy/MM/dd",
        "hsb-DE" : "d. M. yyyy",
        "bs-Cyrl-BA" : "d.M.yyyy",
        "tg-Cyrl-TJ" : "dd.MM.yy",
        "sr-Latn-BA" : "d.M.yyyy",
        "smj-NO" : "dd.MM.yyyy",
        "rm-CH" : "dd/MM/yyyy",
        "smj-SE" : "yyyy-MM-dd",
        "quz-EC" : "dd/MM/yyyy",
        "quz-PE" : "dd/MM/yyyy",
        "hr-BA" : "d.M.yyyy.",
        "sr-Latn-ME" : "d.M.yyyy",
        "sma-SE" : "yyyy-MM-dd",
        "en-SG" : "d/M/yyyy",
        "ug-CN" : "yyyy-M-d",
        "sr-Cyrl-BA" : "d.M.yyyy",
        "es-US" : "M/d/yyyy"};
      res = lFormats[ALocale] || 'dd/MM/yyyy';
      Result = res;
      return Result;
    };
    this.Create = function () {
      var Result = $mod.TFormatSettings.$new();
      Result.$assign($mod.TFormatSettings.Create$1($mod.TFormatSettings.GetBrowserLocale()));
      return Result;
    };
    var cDateSeps = ["\/",".","-"];
    var cTimeSeps = [":",".","-"];
    var cDecSeps = [",","."];
    var cThousandSeps = [".",","];
    this.Create$1 = function (ALocale) {
      var Result = $mod.TFormatSettings.$new();
      var lTimeStr = "";
      var lCount = 0;
      var lLoc = "";
      lLoc = pas.SysUtils.UpperCase(ALocale);
      if (pas.System.Pos("DE-",lLoc) === 1) {
        Result.LongDayNames[0] = "Sonntag";
        Result.LongDayNames[1] = "Montag";
        Result.LongDayNames[2] = "Dienstag";
        Result.LongDayNames[3] = "Mittwoch";
        Result.LongDayNames[4] = "Donnerstag";
        Result.LongDayNames[5] = "Freitag";
        Result.LongDayNames[6] = "Samstag";
        Result.ShortDayNames[0] = "Son";
        Result.ShortDayNames[1] = "Mon";
        Result.ShortDayNames[2] = "Die";
        Result.ShortDayNames[3] = "Mit";
        Result.ShortDayNames[4] = "Don";
        Result.ShortDayNames[5] = "Fre";
        Result.ShortDayNames[6] = "Sam";
        Result.ShortMonthNames[0] = "Jan";
        Result.ShortMonthNames[1] = "Feb";
        Result.ShortMonthNames[2] = "Mär";
        Result.ShortMonthNames[3] = "Apr";
        Result.ShortMonthNames[4] = "Mai";
        Result.ShortMonthNames[5] = "Jun";
        Result.ShortMonthNames[6] = "Jul";
        Result.ShortMonthNames[7] = "Aug";
        Result.ShortMonthNames[8] = "Sep";
        Result.ShortMonthNames[9] = "Okt";
        Result.ShortMonthNames[10] = "Nov";
        Result.ShortMonthNames[11] = "Dez";
        Result.LongMonthNames[0] = "Januar";
        Result.LongMonthNames[1] = "Februar";
        Result.LongMonthNames[2] = "März";
        Result.LongMonthNames[3] = "April";
        Result.LongMonthNames[4] = "Mai";
        Result.LongMonthNames[5] = "Juni";
        Result.LongMonthNames[6] = "Juli";
        Result.LongMonthNames[7] = "August";
        Result.LongMonthNames[8] = "September";
        Result.LongMonthNames[9] = "Oktober";
        Result.LongMonthNames[10] = "November";
        Result.LongMonthNames[11] = "Dezember";
      } else if (pas.System.Pos("FR-",pas.SysUtils.UpperCase(ALocale)) === 1) {
        Result.LongDayNames[0] = "Dimanche";
        Result.LongDayNames[1] = "Lundi";
        Result.LongDayNames[2] = "Mardi";
        Result.LongDayNames[3] = "Mecredi";
        Result.LongDayNames[4] = "Jeudi";
        Result.LongDayNames[5] = "Vendredi";
        Result.LongDayNames[6] = "Samedi";
        Result.ShortDayNames[0] = "Dim";
        Result.ShortDayNames[1] = "Lun";
        Result.ShortDayNames[2] = "Mar";
        Result.ShortDayNames[3] = "Mer";
        Result.ShortDayNames[4] = "Jeu";
        Result.ShortDayNames[5] = "Ven";
        Result.ShortDayNames[6] = "Sam";
        Result.ShortMonthNames[0] = "Jan";
        Result.ShortMonthNames[1] = "Fév";
        Result.ShortMonthNames[2] = "Mar";
        Result.ShortMonthNames[3] = "Avr";
        Result.ShortMonthNames[4] = "Mai";
        Result.ShortMonthNames[5] = "Jun";
        Result.ShortMonthNames[6] = "Jul";
        Result.ShortMonthNames[7] = "Aoû";
        Result.ShortMonthNames[8] = "Sep";
        Result.ShortMonthNames[9] = "Oct";
        Result.ShortMonthNames[10] = "Nov";
        Result.ShortMonthNames[11] = "Dec";
        Result.LongMonthNames[0] = "Janvier";
        Result.LongMonthNames[1] = "Février";
        Result.LongMonthNames[2] = "Mars";
        Result.LongMonthNames[3] = "Avril";
        Result.LongMonthNames[4] = "Mai";
        Result.LongMonthNames[5] = "Juin";
        Result.LongMonthNames[6] = "Juillet";
        Result.LongMonthNames[7] = "Août";
        Result.LongMonthNames[8] = "Septembre";
        Result.LongMonthNames[9] = "Octobre";
        Result.LongMonthNames[10] = "Novembre";
        Result.LongMonthNames[11] = "Décembre";
      } else if (pas.System.Pos("ES-",pas.SysUtils.UpperCase(ALocale)) === 1) {
        Result.LongDayNames[0] = "Domingo";
        Result.LongDayNames[1] = "Lunes";
        Result.LongDayNames[2] = "Martes";
        Result.LongDayNames[3] = "Miércoles";
        Result.LongDayNames[4] = "Jueves";
        Result.LongDayNames[5] = "Viernes";
        Result.LongDayNames[6] = "Sábado";
        Result.ShortDayNames[0] = "Dom";
        Result.ShortDayNames[1] = "Lun";
        Result.ShortDayNames[2] = "Mar";
        Result.ShortDayNames[3] = "Mié";
        Result.ShortDayNames[4] = "Jue";
        Result.ShortDayNames[5] = "Vie";
        Result.ShortDayNames[6] = "Sab";
        Result.ShortMonthNames[0] = "Ene";
        Result.ShortMonthNames[1] = "Feb";
        Result.ShortMonthNames[2] = "Mar";
        Result.ShortMonthNames[3] = "Abr";
        Result.ShortMonthNames[4] = "May";
        Result.ShortMonthNames[5] = "Jun";
        Result.ShortMonthNames[6] = "Jul";
        Result.ShortMonthNames[7] = "Ago";
        Result.ShortMonthNames[8] = "Sep";
        Result.ShortMonthNames[9] = "Oct";
        Result.ShortMonthNames[10] = "Nov";
        Result.ShortMonthNames[11] = "Dic";
        Result.LongMonthNames[0] = "January";
        Result.LongMonthNames[1] = "Febrero";
        Result.LongMonthNames[2] = "Marzi";
        Result.LongMonthNames[3] = "Abril";
        Result.LongMonthNames[4] = "Mayo";
        Result.LongMonthNames[5] = "Junio";
        Result.LongMonthNames[6] = "Julio";
        Result.LongMonthNames[7] = "Agusto";
        Result.LongMonthNames[8] = "Septiembre";
        Result.LongMonthNames[9] = "Octubre";
        Result.LongMonthNames[10] = "Noviembre";
        Result.LongMonthNames[11] = "Diciembre";
      } else {
        Result.LongDayNames[0] = "Sunday";
        Result.LongDayNames[1] = "Monday";
        Result.LongDayNames[2] = "Tuesday";
        Result.LongDayNames[3] = "Wednesday";
        Result.LongDayNames[4] = "Thursday";
        Result.LongDayNames[5] = "Friday";
        Result.LongDayNames[6] = "Saturday";
        Result.ShortDayNames[0] = "Sun";
        Result.ShortDayNames[1] = "Mon";
        Result.ShortDayNames[2] = "Tue";
        Result.ShortDayNames[3] = "Wed";
        Result.ShortDayNames[4] = "Thu";
        Result.ShortDayNames[5] = "Fri";
        Result.ShortDayNames[6] = "Sat";
        Result.ShortMonthNames[0] = "Jan";
        Result.ShortMonthNames[1] = "Feb";
        Result.ShortMonthNames[2] = "Mar";
        Result.ShortMonthNames[3] = "Apr";
        Result.ShortMonthNames[4] = "May";
        Result.ShortMonthNames[5] = "Jun";
        Result.ShortMonthNames[6] = "Jul";
        Result.ShortMonthNames[7] = "Aug";
        Result.ShortMonthNames[8] = "Sep";
        Result.ShortMonthNames[9] = "Oct";
        Result.ShortMonthNames[10] = "Nov";
        Result.ShortMonthNames[11] = "Dec";
        Result.LongMonthNames[0] = "January";
        Result.LongMonthNames[1] = "February";
        Result.LongMonthNames[2] = "March";
        Result.LongMonthNames[3] = "April";
        Result.LongMonthNames[4] = "May";
        Result.LongMonthNames[5] = "June";
        Result.LongMonthNames[6] = "July";
        Result.LongMonthNames[7] = "August";
        Result.LongMonthNames[8] = "September";
        Result.LongMonthNames[9] = "October";
        Result.LongMonthNames[10] = "November";
        Result.LongMonthNames[11] = "December";
      };
      Result.DateTimeToStrFormat[0] = "c";
      Result.DateTimeToStrFormat[1] = "f";
      Result.DateSeparator = "-";
      Result.TimeSeparator = ":";
      Result.ShortDateFormat = "yyyy-mm-dd";
      Result.LongDateFormat = "ddd, yyyy-mm-dd";
      Result.DecimalSeparator = ".";
      Result.ThousandSeparator = ",";
      Result.TimeAMString = "AM";
      Result.TimePMString = "PM";
      Result.TwoDigitYearCenturyWindow = 50;
      Result.ShortTimeFormat = $mod.TFormatSettings.GetLocaleShortTimeFormat(ALocale);
      Result.LongTimeFormat = $mod.TFormatSettings.GetLocaleLongTimeFormat(ALocale);
      Result.ShortDateFormat = $mod.TFormatSettings.GetLocaleShortDateFormat(ALocale);
      for (var $l = 0, $end = rtl.length(cDateSeps) - 1; $l <= $end; $l++) {
        lCount = $l;
        if ($mod.TStringHelper.IndexOf.call({p: Result, get: function () {
            return this.p.ShortDateFormat;
          }, set: function (v) {
            this.p.ShortDateFormat = v;
          }},cDateSeps[lCount]) >= 0) Result.DateSeparator = cDateSeps[lCount];
      };
      var lEvent = new Date('Jan 1, 1980 06:07:08 GMT+00:00');
      var lLoc = "";
      if (ALocale == "")
        lLoc = navigator.language;
      else
        lLoc = ALocale;
      lTimeStr = lEvent.toLocaleTimeString(lLoc);
      for (var $l1 = 0, $end1 = rtl.length(cTimeSeps) - 1; $l1 <= $end1; $l1++) {
        lCount = $l1;
        if ($mod.TStringHelper.IndexOf.call({get: function () {
            return lTimeStr;
          }, set: function (v) {
            lTimeStr = v;
          }},cTimeSeps[lCount]) >= 0) Result.TimeSeparator = cTimeSeps[lCount];
      };
      for (lCount = 1; lCount <= 7; lCount++) Result.ShortDayNames[lCount - 1] = $mod.TFormatSettings.GetLocaleShortDayName(lCount,ALocale);
      for (lCount = 1; lCount <= 7; lCount++) Result.LongDayNames[lCount - 1] = $mod.TFormatSettings.GetLocaleLongDayName(lCount,ALocale);
      for (lCount = 1; lCount <= 12; lCount++) Result.ShortMonthNames[lCount - 1] = $mod.TFormatSettings.GetLocaleShortMonthName(lCount,ALocale);
      for (lCount = 1; lCount <= 12; lCount++) Result.LongMonthNames[lCount - 1] = $mod.TFormatSettings.GetLocaleLongMonthName(lCount,ALocale);
      Result.DecimalSeparator = $mod.TFormatSettings.GetLocaleDecimalSeparator(ALocale);
      for (var $l2 = 0, $end2 = rtl.length(cDecSeps) - 1; $l2 <= $end2; $l2++) {
        lCount = $l2;
        if (Result.DecimalSeparator === cDecSeps[lCount]) {
          Result.ThousandSeparator = cThousandSeps[lCount];
          break;
        };
      };
      return Result;
    };
    this.Invariant = function () {
      var Result = $mod.TFormatSettings.$new();
      Result.$assign($mod.TFormatSettings.Create$1("EN-US"));
      Result.CurrencyString = "¤";
      Result.CurrencyFormat = 0;
      Result.CurrencyDecimals = 2;
      Result.DateSeparator = "\/";
      Result.TimeSeparator = ":";
      Result.ShortDateFormat = "MM\/dd\/yyyy";
      Result.LongDateFormat = "dddd, dd MMMMM yyyy HH:mm:ss";
      Result.TimeAMString = "AM";
      Result.TimePMString = "PM";
      Result.ShortTimeFormat = "HH:mm";
      Result.LongTimeFormat = "HH:mm:ss";
      Result.ThousandSeparator = ",";
      Result.DecimalSeparator = ".";
      Result.TwoDigitYearCenturyWindow = 50;
      Result.NegCurrFormat = 0;
      return Result;
    };
    var $r = $mod.$rtti.$Record("TFormatSettings",{});
    $r.addField("CurrencyDecimals",rtl.byte);
    $r.addField("CurrencyFormat",rtl.byte);
    $r.addField("CurrencyString",rtl.string);
    $r.addField("DateSeparator",rtl.char);
    $mod.$rtti.$StaticArray("TFormatSettings.DateTimeToStrFormat$a",{dims: [2], eltype: rtl.string});
    $r.addField("DateTimeToStrFormat",$mod.$rtti["TFormatSettings.DateTimeToStrFormat$a"]);
    $r.addField("DecimalSeparator",rtl.string);
    $r.addField("LongDateFormat",rtl.string);
    $r.addField("LongDayNames",$mod.$rtti["TDayNames"]);
    $r.addField("LongMonthNames",$mod.$rtti["TMonthNameArray"]);
    $r.addField("LongTimeFormat",rtl.string);
    $r.addField("NegCurrFormat",rtl.byte);
    $r.addField("ShortDateFormat",rtl.string);
    $r.addField("ShortDayNames",$mod.$rtti["TDayNames"]);
    $r.addField("ShortMonthNames",$mod.$rtti["TMonthNameArray"]);
    $r.addField("ShortTimeFormat",rtl.string);
    $r.addField("ThousandSeparator",rtl.string);
    $r.addField("TimeAMString",rtl.string);
    $r.addField("TimePMString",rtl.string);
    $r.addField("TimeSeparator",rtl.char);
    $r.addField("TwoDigitYearCenturyWindow",rtl.word);
    $r.addMethod("Create",5,[],$r,1);
    $r.addMethod("Create$1",5,[["ALocale",rtl.string,2]],$r,1);
    $r.addMethod("Invariant",5,[],$r,1);
  });
  rtl.createClass(this,"TTMSEncoding",pas.System.TObject,function () {
    this.FANSI = null;
    this.FUnicode = null;
    this.get_ANSI = function () {
      var Result = null;
      if ($mod.TTMSEncoding.FANSI === null) $mod.TTMSEncoding.FANSI = $mod.TANSIEncoding.$create("Create");
      Result = $mod.TTMSEncoding.FANSI;
      return Result;
    };
    this.get_Default = function () {
      var Result = null;
      Result = $mod.TTMSEncoding.get_ANSI();
      return Result;
    };
    this.get_Unicode = function () {
      var Result = null;
      if ($mod.TTMSEncoding.FUnicode === null) $mod.TTMSEncoding.FUnicode = $mod.TUnicodeEncoding.$create("Create");
      Result = $mod.TTMSEncoding.FUnicode;
      return Result;
    };
    this.GetByteCount$1 = function (AChars, ACharCount) {
      var Result = 0;
      Result = this.GetByteCount($mod.TStringHelper.Substring$1.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},0,ACharCount));
      return Result;
    };
    this.GetByteCount$2 = function (AChars, ACharIndex, ACharCount) {
      var Result = 0;
      Result = this.GetByteCount($mod.TStringHelper.Substring$1.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},ACharIndex,ACharCount));
      return Result;
    };
    this.GetBytes$1 = function (AChars, ACharCount) {
      var Result = [];
      Result = this.GetBytes($mod.TStringHelper.Substring$1.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},0,ACharCount));
      return Result;
    };
    this.GetBytes$2 = function (AChars, ACharIndex, ACharCount) {
      var Result = [];
      Result = this.GetBytes($mod.TStringHelper.Substring$1.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},ACharIndex,ACharCount));
      return Result;
    };
    this.GetString$1 = function (ABytes, ACharCount) {
      var Result = "";
      Result = this.GetString($mod.TBytesHelper.SubBytes$1.call({get: function () {
          return ABytes;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},0,ACharCount));
      return Result;
    };
    this.GetString$2 = function (ABytes, ACharIndex, ACharCount) {
      var Result = "";
      Result = this.GetString($mod.TBytesHelper.SubBytes$1.call({get: function () {
          return ABytes;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},ACharIndex,ACharCount));
      return Result;
    };
    this.IsStandardEncoding = function (AEncoding) {
      var Result = false;
      Result = (AEncoding !== null) && ((AEncoding === $mod.TTMSEncoding.FANSI) || (AEncoding === $mod.TTMSEncoding.FUnicode));
      return Result;
    };
  });
  rtl.createClass(this,"TANSIEncoding",this.TTMSEncoding,function () {
    this.GetByteCount = function (AChars) {
      var Result = 0;
      Result = $mod.TStringHelper.get_Length.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }});
      return Result;
    };
    this.GetBytes = function (AChars) {
      var Result = [];
      Result = pas.SysUtils.BytesOf(AChars);
      return Result;
    };
    this.GetString = function (ABytes) {
      var Result = "";
      Result = pas.SysUtils.StringOf(ABytes);
      return Result;
    };
  });
  rtl.createClass(this,"TUnicodeEncoding",this.TTMSEncoding,function () {
    this.InternalGetBytes = function (AChars, ABytes) {
      var lWords = [];
      lWords = [];
      for (var lCount = 0; lCount < AChars.length; lCount++)
      lWords.push(AChars.charCodeAt(lCount));
      ABytes.set($mod.TWordsHelper.ToBytes.call({get: function () {
          return lWords;
        }, set: function (v) {
          lWords = v;
        }}));
    };
    this.GetByteCount = function (AChars) {
      var Result = 0;
      Result = 2 * $mod.TStringHelper.get_Length.call({get: function () {
          return AChars;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }});
      return Result;
    };
    this.GetBytes = function (AChars) {
      var Result = [];
      this.InternalGetBytes(AChars,{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }});
      return Result;
    };
    this.GetString = function (ABytes) {
      var Result = "";
      var lWords = [];
      var lBuffer = "";
      lBuffer = $mod.TStringHelper.Empty;
      lWords = $mod.TWordsHelper.FromBytes(ABytes);
      if (rtl.length(lWords) > 0) {
        for (var lCount = 0; lCount < lWords.length; lCount++)
        lBuffer += string.fromCharCode(lWords[lCount]);
      };
      Result = lBuffer;
      return Result;
    };
  });
  rtl.createHelper(this,"TStreamHelper",null,function () {
    var MaxBufSize = 0xF000;
    this.CopyFrom = function (ASource, ACount) {
      var Result = 0;
      var lBufSize = 0;
      var lCount = 0;
      var lBuffer = [];
      if (ACount <= 0) {
        ASource.SetPosition(0);
        ACount = ASource.GetSize();
      };
      Result = ACount;
      if (ACount > 61440) {
        lBufSize = 61440}
       else lBufSize = ACount;
      $mod.TBytesHelper.set_Length.call({get: function () {
          return lBuffer;
        }, set: function (v) {
          lBuffer = v;
        }},lBufSize);
      try {
        while (ACount !== 0) {
          if (ACount > lBufSize) {
            lCount = lBufSize}
           else lCount = ACount;
          ASource.ReadBuffer({get: function () {
              return lBuffer;
            }, set: function (v) {
              lBuffer = v;
            }},lCount);
          this.WriteBuffer(lBuffer,lCount);
          ACount -= lCount;
        };
      } finally {
        $mod.TBytesHelper.set_Length.call({get: function () {
            return lBuffer;
          }, set: function (v) {
            lBuffer = v;
          }},0);
      };
      return Result;
    };
  });
  rtl.createClass(this,"TTMSStringStream",pas.Classes.TBytesStream,function () {
    this.$init = function () {
      pas.Classes.TBytesStream.$init.call(this);
      this.FEncoding = null;
      this.FFileName = "";
      this.FOwnsEncoding = false;
      this.FError = null;
      this.FLoaded = null;
      this.FRequest = null;
    };
    this.$final = function () {
      this.FEncoding = undefined;
      this.FError = undefined;
      this.FLoaded = undefined;
      this.FRequest = undefined;
      pas.Classes.TBytesStream.$final.call(this);
    };
    this.GetDataString = function () {
      var Result = "";
      Result = this.FEncoding.GetString(rtl.arrayCopy(0,this.GetBytes(),0,this.GetSize()));
      return Result;
    };
    this.InternalLoadFromFileP = function (AFileName) {
      var $Self = this;
      var Result = null;
      Result = new Promise(function (AResolve, AReject) {
        $Self.LoadFromFile$3(AFileName,function () {
          AResolve(true);
        },function (AError) {
          AReject(AError);
        });
      });
      return Result;
    };
    this.OnAbort = function (AEvent) {
      var Result = false;
      Result = true;
      if (this.FError != null) this.FError($mod.Format(rtl.getResStr(pas["WEBLib.Consts"],"SLoadFromFileAborted"),[this.FFileName]));
      return Result;
    };
    this.OnError = function (AEvent) {
      var Result = false;
      Result = true;
      if (this.FError != null) this.FError($mod.Format(rtl.getResStr(pas["WEBLib.Consts"],"SErrorLoadFromFile"),[this.FFileName]));
      return Result;
    };
    var cStatusOK$1 = 200;
    var cStatusLastOK = 208;
    this.OnLoad = function (AEvent) {
      var Result = false;
      var lReq = null;
      lReq = AEvent.target;
      if ((lReq.status < 200) || (lReq.status > 208)) {
        if (this.FError != null) {
          this.FError($mod.Format(rtl.getResStr(pas["WEBLib.Consts"],"SCannotGetFile"),[this.FFileName,this.FRequest.status]));
          return Result;
        } else throw $mod.EStringStreamError.$create("CreateFmt",[rtl.getResStr(pas["WEBLib.Consts"],"SCannotGetFile"),[this.FFileName,lReq.status]]);
      };
      this.WriteString(lReq.responseText);
      Result = true;
      if (this.FLoaded != null) this.FLoaded();
      return Result;
    };
    this.Create$2 = function () {
      this.Create$4($mod.TStringHelper.Empty,$mod.TTMSEncoding.get_Default(),false);
      return this;
    };
    this.Create$3 = function (AString) {
      this.Create$4(AString,$mod.TTMSEncoding.get_Default(),false);
      return this;
    };
    this.Create$4 = function (AString, AEncoding, AOwnsEncoding) {
      var lBytes = [];
      pas.System.TObject.Create.call(this);
      this.FEncoding = AEncoding;
      this.FOwnsEncoding = AOwnsEncoding && !$mod.TTMSEncoding.IsStandardEncoding(AEncoding);
      lBytes = this.FEncoding.GetBytes(AString);
      this.SetPointer(this.$class.BytesToMemory(rtl.arrayRef(lBytes)),$mod.TBytesHelper.get_Length.call({get: function () {
          return lBytes;
        }, set: function (v) {
          lBytes = v;
        }}));
      return this;
    };
    this.Destroy = function () {
      if (this.FOwnsEncoding) rtl.free(this,"FEncoding");
      pas.Classes.TMemoryStream.Destroy.call(this);
    };
    var cStatusOK = 200;
    this.LoadFromFile$1 = function (AFileName) {
      var lStatus = 0;
      var lResponse = "";
      lResponse = $mod.TStringHelper.Empty;
      lStatus = 200;
      var lRequest = new XMLHttpRequest();
          lRequest.open("GET", AFileName, false);
          lRequest.send();
      
          if (lRequest.status == cStatusOK)
            lResponse = lRequest.responseText
          else
            lStatus = lRequest.status;
      if (lStatus !== 200) throw $mod.EStringStreamError.$create("CreateFmt",[rtl.getResStr(pas["WEBLib.Consts"],"SCannotGetFile"),[AFileName,lStatus]]);
      this.WriteString(lResponse);
    };
    this.LoadFromFile$2 = function (AFileName, ALoaded) {
      this.LoadFromFile$3(AFileName,ALoaded,null);
    };
    var cAbortMethod = "abort";
    var cErrorMethod = "error";
    var cGetMethod = "GET";
    var cLoadMethod = "load";
    this.LoadFromFile$3 = function (AFileName, ALoaded, AError) {
      this.FLoaded = ALoaded;
      this.FError = AError;
      this.FFileName = AFileName;
      this.FRequest = new XMLHttpRequest();
      this.FRequest.addEventListener(cAbortMethod,rtl.createSafeCallback(this,"OnAbort"));
      this.FRequest.addEventListener(cErrorMethod,rtl.createSafeCallback(this,"OnError"));
      this.FRequest.addEventListener(cLoadMethod,rtl.createSafeCallback(this,"OnLoad"));
      try {
        this.FRequest.open(cGetMethod,AFileName,true);
        this.FRequest.send();
      } catch ($e) {
        if (pas.SysUtils.Exception.isPrototypeOf($e)) {
          var E = $e;
          if (AError != null) {
            AError(E.fMessage)}
           else throw $e;
        } else throw $e
      };
    };
    this.LoadFromFileP = async function (AFileName) {
      var Result = false;
      Result = await this.InternalLoadFromFileP(AFileName);
      return Result;
    };
    this.ReadString = function (ACount) {
      var Result = "";
      var lBytes = [];
      var lDest = [];
      var lCount = 0;
      if (ACount > (this.GetSize() - this.GetPosition())) ACount = this.GetSize() - this.GetPosition();
      $mod.TBytesHelper.set_Length.call({get: function () {
          return lDest;
        }, set: function (v) {
          lDest = v;
        }},ACount);
      lBytes = rtl.arrayRef(this.GetBytes());
      for (var $l = this.GetPosition(), $end = (ACount + this.GetPosition()) - 1; $l <= $end; $l++) {
        lCount = $l;
        lDest[lCount - this.GetPosition()] = lBytes[lCount];
      };
      Result = this.FEncoding.GetString(lDest);
      this.SetPosition(this.GetPosition() + ACount);
      return Result;
    };
    this.WriteString = function (AString) {
      var lBytes = [];
      var lData = "";
      lBytes = this.FEncoding.GetBytes(AString);
      this.Write$1(lBytes,0,$mod.TBytesHelper.get_Length.call({get: function () {
          return lBytes;
        }, set: function (v) {
          lBytes = v;
        }}));
      lData = this.GetDataString();
      if (lData !== AString) this.WriteString("");
    };
  });
  rtl.createInterface(this,"IInterfaceList","{285DEA8A-B865-11D1-AAA7-00C04FB17A72}",["Add","Clear","Delete","Exchange","Expand","First","get_Capacity","get_Count","get_Items","IndexOf","IndexOfItem","Insert","Last","Lock","Remove","RemoveItem","set_Capacity","set_Count","set_Items","Unlock"],pas.System.IUnknown,function () {
    var $r = this.$rtti;
    $r.addMethod("Add",1,[["AItem",pas.System.$rtti["IUnknown"],2]],rtl.longint);
    $r.addMethod("Clear",0,[]);
    $r.addMethod("Delete",0,[["AIndex",rtl.longint,2]]);
    $r.addMethod("Exchange",0,[["AIndex1",rtl.longint,2],["AIndex2",rtl.longint,2]]);
    $r.addMethod("Expand",1,[],$mod.$rtti["TInterfaceList"]);
    $r.addMethod("First",1,[],pas.System.$rtti["IUnknown"]);
    $r.addMethod("get_Capacity",1,[],rtl.longint);
    $r.addMethod("get_Count",1,[],rtl.longint);
    $r.addMethod("get_Items",1,[["AIndex",rtl.longint,2]],pas.System.$rtti["IUnknown"]);
    $r.addMethod("IndexOf",1,[["AItem",pas.System.$rtti["IUnknown"],2]],rtl.longint);
    $r.addMethod("IndexOfItem",1,[["AItem",pas.System.$rtti["IUnknown"],2],["ADirection",pas.Types.$rtti["TDirection"],2]],rtl.longint);
    $r.addMethod("Insert",0,[["AIndex",rtl.longint,2],["AItem",pas.System.$rtti["IUnknown"],2]]);
    $r.addMethod("Last",1,[],pas.System.$rtti["IUnknown"]);
    $r.addMethod("Lock",0,[]);
    $r.addMethod("Remove",1,[["AItem",pas.System.$rtti["IUnknown"],2]],rtl.longint);
    $r.addMethod("RemoveItem",1,[["AItem",pas.System.$rtti["IUnknown"],2],["ADirection",pas.Types.$rtti["TDirection"],2]],rtl.longint);
    $r.addMethod("set_Capacity",0,[["AValue",rtl.longint,2]]);
    $r.addMethod("set_Count",0,[["AValue",rtl.longint,2]]);
    $r.addMethod("set_Items",0,[["AIndex",rtl.longint,2],["AItem",pas.System.$rtti["IUnknown"],2]]);
    $r.addMethod("Unlock",0,[]);
    $r.addProperty("Count",3,rtl.longint,"get_Count","set_Count");
    $r.addProperty("Items",3,pas.System.$rtti["IUnknown"],"get_Items","set_Items");
  });
  rtl.createClass(this,"TInterfaceListEnumerator",pas.System.TObject,function () {
    this.$init = function () {
      pas.System.TObject.$init.call(this);
      this.FIndex = 0;
      this.FInterfaceList = null;
    };
    this.$final = function () {
      this.FInterfaceList = undefined;
      pas.System.TObject.$final.call(this);
    };
    this.get_Current = function () {
      var Result = null;
      var $ok = false;
      try {
        Result = rtl.setIntfL(Result,this.FInterfaceList.get_Items(this.FIndex),true);
        $ok = true;
      } finally {
        if (!$ok) rtl._Release(Result);
      };
      return Result;
    };
    this.Create$1 = function (AInterfaceList) {
      pas.System.TObject.Create.call(this);
      this.FIndex = -1;
      this.FInterfaceList = AInterfaceList;
      return this;
    };
    this.MoveNext = function () {
      var Result = false;
      Result = this.FIndex < (this.FInterfaceList.get_Count() - 1);
      if (Result) this.FIndex += 1;
      return Result;
    };
  });
  rtl.createInterface(this,"IInterfaceListEx","{FDB39D70-65B9-4995-9436-6084ACA05DB3}",["GetEnumerator"],this.IInterfaceList,function () {
    var $r = this.$rtti;
    $r.addMethod("GetEnumerator",1,[],$mod.$rtti["TInterfaceListEnumerator"]);
  });
  this.$rtti.$RefToProcVar("TCompareItems",{procsig: rtl.newTIProcSig([["ALeft",pas.System.$rtti["IUnknown"],2],["ARight",pas.System.$rtti["IUnknown"],2]],pas.Math.$rtti["TValueRelationship"])});
  rtl.createInterface(this,"IInterfaceListEx2","{4FE71218-0F8F-4027-B050-5E84E2202604}",["Sort"],this.IInterfaceList,function () {
    var $r = this.$rtti;
    $r.addMethod("Sort",0,[["ACompare",$mod.$rtti["TCompareItems"],2]]);
  });
  rtl.createClass(this,"TInterfaceList",pas.System.TInterfacedObject,function () {
    this.$init = function () {
      pas.System.TInterfacedObject.$init.call(this);
      this.FList = null;
    };
    this.$final = function () {
      this.FList = undefined;
      pas.System.TInterfacedObject.$final.call(this);
    };
    this.Add = function (AItem) {
      var Result = 0;
      Result = this.FList.Add(null);
      this.set_Items(Result,AItem);
      return Result;
    };
    this.Clear = function () {
      var lCount = 0;
      for (var $l = 0, $end = this.FList.FCount - 1; $l <= $end; $l++) {
        lCount = $l;
        this.set_Items(lCount,null);
      };
      this.FList.Clear();
    };
    this.Delete = function (AIndex) {
      this.set_Items(AIndex,null);
      this.FList.Delete(AIndex);
    };
    this.Exchange = function (AIndex1, AIndex2) {
      this.FList.Exchange(AIndex1,AIndex2);
    };
    this.Expand = function () {
      var Result = null;
      this.FList.Expand();
      Result = this;
      return Result;
    };
    this.First = function () {
      var Result = null;
      var $ok = false;
      try {
        Result = rtl.setIntfL(Result,this.get_Items(0),true);
        $ok = true;
      } finally {
        if (!$ok) rtl._Release(Result);
      };
      return Result;
    };
    this.GetEnumerator = function () {
      var Result = null;
      Result = $mod.TInterfaceListEnumerator.$create("Create$1",[this]);
      return Result;
    };
    this.get_Capacity = function () {
      var Result = 0;
      Result = this.FList.FCapacity;
      return Result;
    };
    this.get_Count = function () {
      var Result = 0;
      Result = this.FList.FCount;
      return Result;
    };
    this.get_Items = function (AIndex) {
      var Result = null;
      var $ok = false;
      try {
        Result = rtl.setIntfL(Result,rtl.getObject(this.FList.Get(AIndex)));
        $ok = true;
      } finally {
        if (!$ok) rtl._Release(Result);
      };
      return Result;
    };
    this.IndexOf = function (AItem) {
      var Result = 0;
      Result = this.IndexOfItem(AItem,pas.Types.TDirection.FromBeginning);
      return Result;
    };
    this.IndexOfItem = function (AItem, ADirection) {
      var Result = 0;
      Result = this.FList.IndexOfItem(AItem,ADirection);
      return Result;
    };
    this.Insert = function (AIndex, AItem) {
      this.FList.Insert(AIndex,null);
      this.set_Items(AIndex,AItem);
    };
    this.Last = function () {
      var Result = null;
      var $ok = false;
      try {
        Result = rtl.setIntfL(Result,this.get_Items(this.get_Count() - 1),true);
        $ok = true;
      } finally {
        if (!$ok) rtl._Release(Result);
      };
      return Result;
    };
    this.Lock = function () {
    };
    this.Remove = function (AItem) {
      var Result = 0;
      Result = this.RemoveItem(AItem,pas.Types.TDirection.FromBeginning);
      return Result;
    };
    this.RemoveItem = function (AItem, ADirection) {
      var Result = 0;
      Result = this.FList.IndexOfItem(AItem,ADirection);
      if (Result > -1) this.Delete(Result);
      return Result;
    };
    this.set_Capacity = function (AValue) {
      this.FList.SetCapacity(AValue);
    };
    this.set_Count = function (AValue) {
      this.FList.SetCount(AValue);
    };
    this.set_Items = function (AIndex, AItem) {
      if (this.FList.Get(AIndex) != null) rtl.getObject(this.FList.Get(AIndex))._Release();
      this.FList.Put(AIndex,AItem);
      if (AItem !== null) AItem._AddRef();
    };
    this.Sort = function (ACompare) {
      $impl.FCompare = ACompare;
      try {
        this.FList.Sort($impl.InternalCompare);
      } finally {
        $impl.FCompare = null;
      };
    };
    this.Unlock = function () {
    };
    this.Create$1 = function () {
      pas.System.TObject.Create.call(this);
      this.FList = pas.Classes.TFPList.$create("Create");
      return this;
    };
    this.Destroy = function () {
      this.Clear();
      rtl.free(this,"FList");
      pas.System.TObject.Destroy.call(this);
    };
    rtl.addIntf(this,$mod.IInterfaceList);
    rtl.addIntf(this,$mod.IInterfaceListEx);
    rtl.addIntf(this,$mod.IInterfaceListEx2);
    rtl.addIntf(this,pas.System.IUnknown);
  });
  rtl.recNewT(this,"TPath",function () {
    this.$eq = function (b) {
      return true;
    };
    this.$assign = function (s) {
      return this;
    };
    this.Combine = function (APath1, APath2) {
      var Result = "";
      if ($mod.TStringHelper.NotIsEmpty.call({get: function () {
          return APath1;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}) && ($mod.TStringHelper.get_Chars.call({get: function () {
          return APath1;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},$mod.TStringHelper.get_Length.call({get: function () {
          return APath1;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}) - 1) !== pas.System.PathDelim)) {
        Result = APath1 + pas.System.PathDelim + APath2}
       else Result = APath1 + APath2;
      return Result;
    };
    this.GetDirectoryName = function (AFileName) {
      var Result = "";
      var lIndex = 0;
      lIndex = $mod.TStringHelper.LastIndexOf.call({get: function () {
          return AFileName;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }},pas.System.PathDelim);
      if (lIndex >= 0) {
        Result = $mod.TStringHelper.Substring$1.call({get: function () {
            return AFileName;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }},0,lIndex)}
       else Result = AFileName;
      return Result;
    };
    var cSeparator = ".";
    this.GetExtension = function (AFileName) {
      var Result = "";
      var lIndex = 0;
      Result = $mod.TStringHelper.Empty;
      if ($mod.TStringHelper.NotIsEmpty.call({get: function () {
          return AFileName;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }})) {
        lIndex = $mod.TStringHelper.LastIndexOf.call({get: function () {
            return AFileName;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }},cSeparator);
        if (lIndex >= 0) Result = $mod.TStringHelper.Substring.call({get: function () {
            return AFileName;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }},lIndex);
      };
      return Result;
    };
    var $r = $mod.$rtti.$Record("TPath",{});
    $r.addMethod("Combine",5,[["APath1",rtl.string,2],["APath2",rtl.string,2]],rtl.string,1);
    $r.addMethod("GetDirectoryName",5,[["AFileName",rtl.string,2]],rtl.string,1);
    $r.addMethod("GetExtension",5,[["AFileName",rtl.string,2]],rtl.string,1);
  });
  rtl.recNewT(this,"TDirectory",function () {
    this.$eq = function (b) {
      return true;
    };
    this.$assign = function (s) {
      return this;
    };
    this.GetCurrentDirectory = function () {
      var Result = "";
      Result = $mod.TPath.GetDirectoryName(window.document.location.href);
      return Result;
    };
    var $r = $mod.$rtti.$Record("TDirectory",{});
    $r.addMethod("GetCurrentDirectory",5,[],rtl.string,1);
  });
  rtl.createClass(this,"TStringBuilder",pas.System.TObject,function () {
    this.$init = function () {
      pas.System.TObject.$init.call(this);
      this.FData = "";
    };
    this.get_Length = function () {
      var Result = 0;
      Result = $mod.TStringHelper.get_Length.call({p: this, get: function () {
          return this.p.FData;
        }, set: function (v) {
          this.p.FData = v;
        }});
      return Result;
    };
    this.set_Length = function (AValue) {
      $mod.TStringHelper.set_Length.call({p: this, get: function () {
          return this.p.FData;
        }, set: function (v) {
          this.p.FData = v;
        }},AValue);
    };
    this.Create$1 = function (AValue) {
      pas.System.TObject.Create.call(this);
      this.FData = AValue;
      return this;
    };
    this.Append = function (AValue) {
      var Result = null;
      Result = this.Append$1($mod.TLongIntHelper.ToString.call({get: function () {
          return AValue;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}));
      return Result;
    };
    this.Append$1 = function (AValue) {
      var Result = null;
      this.FData = this.FData + AValue;
      Result = this;
      return Result;
    };
    this.Insert = function (AIndex, AValue) {
      var Result = null;
      Result = this.Insert$1(AIndex,$mod.TLongIntHelper.ToString.call({get: function () {
          return AValue;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }}));
      return Result;
    };
    this.Insert$1 = function (AIndex, AValue) {
      var Result = null;
      $mod.TStringHelper.Insert.call({p: this, get: function () {
          return this.p.FData;
        }, set: function (v) {
          this.p.FData = v;
        }},AIndex,AValue);
      Result = this;
      return Result;
    };
    this.ToString = function () {
      var Result = "";
      Result = this.FData;
      return Result;
    };
  });
  this.DateTimeToStr = function (ADateTime, AForceTimeIfZero) {
    var Result = "";
    Result = $mod.DateTimeToStr$1(ADateTime,$mod.FormatSettings,AForceTimeIfZero);
    return Result;
  };
  this.DateTimeToStr$1 = function (ADateTime, AFormatSettings, AForceTimeIfZero) {
    var Result = "";
    Result = $mod.FormatDateTime$1(AFormatSettings.DateTimeToStrFormat[+AForceTimeIfZero],ADateTime,AFormatSettings);
    return Result;
  };
  this.DateToStr = function (ADateTime) {
    var Result = "";
    Result = $mod.DateToStr$1(ADateTime,$mod.FormatSettings);
    return Result;
  };
  var cDateFormat = "ddddd";
  this.DateToStr$1 = function (ADateTime, AFormatSettings) {
    var Result = "";
    Result = $mod.FormatDateTime$1(cDateFormat,ADateTime,AFormatSettings);
    return Result;
  };
  this.FormatDateTime = function (AFormatStr, ADateTime) {
    var Result = "";
    Result = $mod.FormatDateTime$1(AFormatStr,ADateTime,$mod.FormatSettings);
    return Result;
  };
  this.FormatDateTime$1 = function (AFormatStr, ADateTime, AFormatSettings) {
    var Result = "";
    Result = $impl.TFormatDateTimeHelper.FormatDateTime(AFormatStr,AFormatSettings,ADateTime);
    return Result;
  };
  this.TimeToStr = function (ATime) {
    var Result = "";
    Result = $mod.TimeToStr$1(ATime,$mod.FormatSettings);
    return Result;
  };
  this.TimeToStr$1 = function (ATime, AFormatSettings) {
    var Result = "";
    Result = $mod.FormatDateTime$1("tt",ATime,AFormatSettings);
    return Result;
  };
  this.TryStrToDate = function (AString, AValue) {
    var Result = false;
    Result = $mod.TryStrToDate$1(AString,AValue,$mod.FormatSettings);
    return Result;
  };
  this.TryStrToDate$1 = function (AString, AValue, AFormatSettings) {
    var Result = false;
    var lMsg = "";
    Result = $mod.TStringHelper.NotIsEmpty.call({get: function () {
        return AString;
      }, set: function (v) {
        rtl.raiseE("EPropReadOnly");
      }});
    if (Result) {
      AValue.set($impl.IntStrToDate({get: function () {
          return lMsg;
        }, set: function (v) {
          lMsg = v;
        }},AString,AFormatSettings.ShortDateFormat,AFormatSettings));
      Result = $mod.TStringHelper.IsEmpty.call({get: function () {
          return lMsg;
        }, set: function (v) {
          lMsg = v;
        }});
    } else AValue.set(0);
    return Result;
  };
  this.StrToDateDef = function (AValue, ADefault) {
    var Result = 0.0;
    Result = $mod.StrToDateDef$1(AValue,ADefault,$mod.FormatSettings);
    return Result;
  };
  this.StrToDateDef$1 = function (AValue, ADefault, AFormatSettings) {
    var Result = 0.0;
    if (!$mod.TryStrToDate$1(AValue,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},AFormatSettings)) Result = ADefault;
    return Result;
  };
  this.StrToDate = function (AValue) {
    var Result = 0.0;
    Result = $mod.StrToDate$1(AValue,$mod.FormatSettings);
    return Result;
  };
  this.StrToDate$1 = function (AValue, AFormatSettings) {
    var Result = 0.0;
    var lMsg = "";
    Result = $impl.IntStrToDate({get: function () {
        return lMsg;
      }, set: function (v) {
        lMsg = v;
      }},AValue,AFormatSettings.ShortDateFormat,AFormatSettings);
    if (lMsg !== "") throw $mod.EConvertError.$create("Create$1",[lMsg]);
    return Result;
  };
  this.StrToDateTimeDef = function (AValue, ADefault) {
    var Result = 0.0;
    Result = $mod.StrToDateTimeDef$1(AValue,ADefault,$mod.FormatSettings);
    return Result;
  };
  this.StrToDateTimeDef$1 = function (AValue, ADefault, AFormatSettings) {
    var Result = 0.0;
    if (!$mod.TryStrToDateTime$1(AValue,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},AFormatSettings)) Result = ADefault;
    return Result;
  };
  this.StrToDateTime = function (AString) {
    var Result = 0.0;
    Result = $mod.StrToDateTime$1(AString,$mod.FormatSettings);
    return Result;
  };
  this.StrToDateTime$1 = function (AString, AFormatSettings) {
    var Result = 0.0;
    var lTimeStr = "";
    var lDateStr = "";
    var lPartsFound = 0;
    lPartsFound = $impl.SplitDateTimeStr(AString,{get: function () {
        return lDateStr;
      }, set: function (v) {
        lDateStr = v;
      }},{get: function () {
        return lTimeStr;
      }, set: function (v) {
        lTimeStr = v;
      }},AFormatSettings);
    var $tmp = lPartsFound;
    if ($tmp === 0) {
      Result = $mod.StrToDate$1("",AFormatSettings)}
     else if ($tmp === 1) {
      if (lDateStr !== "") {
        Result = $mod.StrToDate$1(lDateStr,AFormatSettings)}
       else Result = $mod.StrToTime$1(lTimeStr,AFormatSettings)}
     else if ($tmp === 2) Result = pas.SysUtils.ComposeDateTime($mod.StrToDate$1(lDateStr,AFormatSettings),$mod.StrToTime$1(lTimeStr,AFormatSettings));
    return Result;
  };
  this.TryStrToDateTime = function (AString, AValue) {
    var Result = false;
    Result = $mod.TryStrToDateTime$1(AString,AValue,$mod.FormatSettings);
    return Result;
  };
  this.TryStrToDateTime$1 = function (AString, AValue, AFormatSettings) {
    var Result = false;
    var lCount = 0;
    var lDate = 0.0;
    var lTime = 0.0;
    Result = false;
    lCount = pas.System.Pos(AFormatSettings.TimeSeparator,AString);
    if (lCount > 0) {
      while ((lCount > 0) && (AString.charAt(lCount - 1) !== " ")) lCount -= 1;
      if (lCount > 0) {
        if (!$mod.TryStrToDate$1(pas.System.Copy(AString,1,lCount - 1),{get: function () {
            return lDate;
          }, set: function (v) {
            lDate = v;
          }},AFormatSettings)) return Result;
        if (!$mod.TryStrToTime$1(pas.System.Copy(AString,lCount + 1,AString.length - lCount),{get: function () {
            return lTime;
          }, set: function (v) {
            lTime = v;
          }},AFormatSettings)) return Result;
        AValue.set(pas.SysUtils.ComposeDateTime(lDate,lTime));
        Result = true;
      } else Result = $mod.TryStrToTime$1(AString,AValue,AFormatSettings);
    } else Result = $mod.TryStrToDate$1(AString,AValue,AFormatSettings);
    return Result;
  };
  this.TryStrToFloat = function (AString, AValue) {
    var Result = false;
    Result = $mod.TryStrToFloat$3(AString,AValue,$mod.FormatSettings);
    return Result;
  };
  this.TryStrToFloat$1 = function (AString, AValue, AFormatSettings) {
    var Result = false;
    Result = $mod.TryStrToFloat$3(AString,AValue,AFormatSettings);
    return Result;
  };
  this.TryStrToFloat$2 = function (AString, AValue) {
    var Result = false;
    Result = $mod.TryStrToFloat$3(AString,AValue,$mod.FormatSettings);
    return Result;
  };
  var cDecSepEN = ".";
  this.TryStrToFloat$3 = function (AString, AValue, AFormatSettings) {
    var Result = false;
    var lString = "";
    var lValue = undefined;
    lString = AString;
    if (AFormatSettings.ThousandSeparator !== "") lString = pas.SysUtils.StringReplace(lString,AFormatSettings.ThousandSeparator,"",rtl.createSet(pas.SysUtils.TStringReplaceFlag.rfReplaceAll));
    if (AFormatSettings.DecimalSeparator !== cDecSepEN) lString = pas.SysUtils.StringReplace(lString,AFormatSettings.DecimalSeparator,cDecSepEN,{});
    lValue = parseFloat(lString);
    Result = !isNaN(lValue);
    if (Result) {
      AValue.set(rtl.getNumber(lValue))}
     else AValue.set(0);
    return Result;
  };
  this.TryStrToTime = function (AString, AValue) {
    var Result = false;
    Result = $mod.TryStrToTime$1(AString,AValue,$mod.FormatSettings);
    return Result;
  };
  this.TryStrToTime$1 = function (AString, AValue, AFormatSettings) {
    var Result = false;
    var lMsg = "";
    Result = AString !== "";
    if (Result) {
      AValue.set($impl.IntStrToTime({get: function () {
          return lMsg;
        }, set: function (v) {
          lMsg = v;
        }},AString,AString.length,AFormatSettings));
      Result = lMsg === "";
    };
    return Result;
  };
  this.StrToFloat = function (AString) {
    var Result = 0.0;
    Result = $mod.StrToFloat$1(AString,$mod.FormatSettings);
    return Result;
  };
  this.StrToFloat$1 = function (AString, AFormatSettings) {
    var Result = 0.0;
    if (!$mod.TryStrToFloat$3(AString,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},AFormatSettings)) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SErrInvalidFloat"),[AString]]);
    return Result;
  };
  this.StrToTime = function (AString) {
    var Result = 0.0;
    Result = $mod.StrToTime$1(AString,$mod.FormatSettings);
    return Result;
  };
  this.StrToTime$1 = function (AString, AFormatSettings) {
    var Result = 0.0;
    var lMsg = "";
    Result = $impl.IntStrToTime({get: function () {
        return lMsg;
      }, set: function (v) {
        lMsg = v;
      }},AString,AString.length,AFormatSettings);
    if (lMsg !== "") throw $mod.EConvertError.$create("Create$1",[lMsg]);
    return Result;
  };
  this.StrToTimeDef = function (AString, ADefault) {
    var Result = 0.0;
    Result = $mod.StrToTimeDef$1(AString,ADefault,$mod.FormatSettings);
    return Result;
  };
  this.StrToTimeDef$1 = function (AString, ADefault, AFormatSettings) {
    var Result = 0.0;
    if (!$mod.TryStrToTime$1(AString,{get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},$mod.FormatSettings)) Result = ADefault;
    return Result;
  };
  this.UseVariable = function (AValue) {
  };
  this.UseVariable$1 = function (AValue) {
  };
  this.UseVariable$2 = function (AValue) {
  };
  this.FloatToStrF = function (AValue, AFormat, APrecision, ADigits) {
    var Result = "";
    Result = $mod.FloatToStrF$1(AValue,AFormat,APrecision,ADigits,$mod.FormatSettings);
    return Result;
  };
  var cMinLength = 1;
  var cMinus = "-";
  this.FloatToStrF$1 = function (AValue, AFormat, APrecision, ADigits, AFormatSettings) {
    var Result = "";
    var lDecimalSeperator = "";
    lDecimalSeperator = AFormatSettings.DecimalSeparator;
    var $tmp = AFormat;
    if ($tmp === pas.SysUtils.TFloatFormat.ffGeneral) {
      Result = $impl.FormatGeneralFloat(AValue,APrecision,lDecimalSeperator)}
     else if ($tmp === pas.SysUtils.TFloatFormat.ffExponent) {
      Result = $impl.FormatExponentFloat(AValue,APrecision,ADigits,lDecimalSeperator,AFormatSettings)}
     else if ($tmp === pas.SysUtils.TFloatFormat.ffFixed) {
      Result = $impl.FormatFixedFloat(AValue,ADigits,lDecimalSeperator)}
     else if ($tmp === pas.SysUtils.TFloatFormat.ffNumber) {
      Result = $impl.FormatNumberFloat(AValue,ADigits,lDecimalSeperator,AFormatSettings.ThousandSeparator)}
     else if ($tmp === pas.SysUtils.TFloatFormat.ffCurrency) Result = $impl.FormatNumberCurrency(AValue * 10000,ADigits,lDecimalSeperator,AFormatSettings.ThousandSeparator,AFormatSettings);
    if ((AFormat !== pas.SysUtils.TFloatFormat.ffCurrency) && ($mod.TStringHelper.get_Length.call({get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }}) > 1) && ($mod.TStringHelper.FirstChar.call({get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }}) === cMinus)) $impl.RemoveLeadingNegativeSign({get: function () {
        return Result;
      }, set: function (v) {
        Result = v;
      }},lDecimalSeperator,AFormatSettings);
    return Result;
  };
  this.FloatToStr = function (AValue) {
    var Result = "";
    Result = $mod.FloatToStr$1(AValue,$mod.FormatSettings);
    return Result;
  };
  this.FloatToStr$1 = function (AValue, AFormatSettings) {
    var Result = "";
    Result = $mod.FloatToStrF$1(AValue,pas.SysUtils.TFloatFormat.ffGeneral,15,0,AFormatSettings);
    return Result;
  };
  this.Format = function (AFmt, AArgs) {
    var Result = "";
    Result = $mod.Format$1(AFmt,AArgs,$mod.FormatSettings);
    return Result;
  };
  this.Format$1 = function (AFmt, AArgs, AFormatSettings) {
    var Result = "";
    var lChPos = 0;
    var lOldPos = 0;
    var lArgPos = 0;
    var lDoArg = 0;
    var lLen = 0;
    var lHs = "";
    var lToAdd = "";
    var lIndex = 0;
    var lWidth = 0;
    var lPrec = 0;
    var lLeft = false;
    var lFChar = "";
    var lvq = 0;
    function ReadFormat() {
      var Result = "";
      var lValue = 0;
      function ReadInteger() {
        var lCode = 0;
        var lArgN = 0;
        if (lValue !== -1) return;
        lOldPos = lChPos;
        while ((lChPos <= lLen) && (AFmt.charAt(lChPos - 1) <= "9") && (AFmt.charAt(lChPos - 1) >= "0")) lChPos += 1;
        if (lChPos > lLen) $impl.DoFormatError(1,AFmt);
        if (AFmt.charAt(lChPos - 1) === "*") {
          if (lIndex === -1) {
            lArgN = lArgPos}
           else {
            lArgN = lIndex;
            lIndex += 1;
          };
          if ((lChPos > lOldPos) || (lArgN > (rtl.length(AArgs) - 1))) $impl.DoFormatError(1,AFmt);
          lArgPos = lArgN + 1;
          if (rtl.isNumber(AArgs[lArgN]) && pas.JS.isInteger(AArgs[lArgN])) {
            lValue = rtl.trunc(AArgs[lArgN])}
           else $impl.DoFormatError(1,AFmt);
          lChPos += 1;
        } else {
          if (lOldPos < lChPos) {
            pas.System.val(pas.System.Copy(AFmt,lOldPos,lChPos - lOldPos),{get: function () {
                return lValue;
              }, set: function (v) {
                lValue = v;
              }},{get: function () {
                return lCode;
              }, set: function (v) {
                lCode = v;
              }});
            if (lCode > 0) $impl.DoFormatError(1,AFmt);
          } else lValue = -1;
        };
      };
      function ReadIndex() {
        if (AFmt.charAt(lChPos - 1) !== ":") {
          ReadInteger()}
         else lValue = 0;
        if (AFmt.charAt(lChPos - 1) === ":") {
          if (lValue === -1) $impl.DoFormatError(2,AFmt);
          lIndex = lValue;
          lValue = -1;
          lChPos += 1;
        };
      };
      function ReadLeft() {
        if (AFmt.charAt(lChPos - 1) === "-") {
          lLeft = true;
          lChPos += 1;
        } else lLeft = false;
      };
      function ReadWidth() {
        ReadInteger();
        if (lValue !== -1) {
          lWidth = lValue;
          lValue = -1;
        };
      };
      function ReadPrec() {
        if (AFmt.charAt(lChPos - 1) === ".") {
          lChPos += 1;
          ReadInteger();
          if (lValue === -1) lValue = 0;
          lPrec = lValue;
        };
      };
      lIndex = -1;
      lWidth = -1;
      lPrec = -1;
      lValue = -1;
      lChPos += 1;
      if (AFmt.charAt(lChPos - 1) === "%") {
        Result = "%";
        return Result;
      };
      ReadIndex();
      ReadLeft();
      ReadWidth();
      ReadPrec();
      Result = pas.System.upcase(AFmt.charAt(lChPos - 1));
      return Result;
    };
    function Checkarg(AT, err) {
      var Result = false;
      Result = false;
      if (lIndex === -1) {
        lDoArg = lArgPos}
       else lDoArg = lIndex;
      lArgPos = lDoArg + 1;
      if ((lDoArg > (rtl.length(AArgs) - 1)) || (pas.JS.GetValueType(AArgs[lDoArg]) !== AT)) {
        if (err) $impl.DoFormatError(3,AFmt);
        lArgPos -= 1;
        return Result;
      };
      Result = true;
      return Result;
    };
    Result = "";
    lLen = AFmt.length;
    lChPos = 1;
    lOldPos = 1;
    lArgPos = 0;
    while (lChPos <= lLen) {
      while ((lChPos <= lLen) && (AFmt.charAt(lChPos - 1) !== "%")) lChPos += 1;
      if (lChPos > lOldPos) Result = Result + pas.System.Copy(AFmt,lOldPos,lChPos - lOldPos);
      if (lChPos < lLen) {
        lFChar = ReadFormat();
        var $tmp = lFChar;
        if ($tmp === "D") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          lToAdd = pas.SysUtils.IntToStr(rtl.trunc(AArgs[lDoArg]));
          lWidth = Math.abs(lWidth);
          lIndex = lPrec - lToAdd.length;
          if (lToAdd.charAt(0) !== "-") {
            lToAdd = pas.System.StringOfChar("0",lIndex) + lToAdd}
           else pas.System.Insert(pas.System.StringOfChar("0",lIndex + 1),{get: function () {
              return lToAdd;
            }, set: function (v) {
              lToAdd = v;
            }},2);
        } else if ($tmp === "U") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          if (rtl.trunc(AArgs[lDoArg]) < 0) $impl.DoFormatError(3,AFmt);
          lToAdd = pas.SysUtils.IntToStr(rtl.trunc(AArgs[lDoArg]));
          lWidth = Math.abs(lWidth);
          lIndex = lPrec - lToAdd.length;
          lToAdd = pas.System.StringOfChar("0",lIndex) + lToAdd;
        } else if ($tmp === "E") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) lToAdd = $mod.FloatToStrF$1(rtl.getNumber(AArgs[lDoArg]),pas.SysUtils.TFloatFormat.ffFixed,9999,lPrec,AFormatSettings);
        } else if ($tmp === "F") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) lToAdd = $mod.FloatToStrF$1(rtl.getNumber(AArgs[lDoArg]),pas.SysUtils.TFloatFormat.ffFixed,9999,lPrec,AFormatSettings);
        } else if ($tmp === "G") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) lToAdd = $mod.FloatToStrF$1(rtl.getNumber(AArgs[lDoArg]),pas.SysUtils.TFloatFormat.ffGeneral,lPrec,3,AFormatSettings);
        } else if ($tmp === "N") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) lToAdd = $mod.FloatToStrF$1(rtl.getNumber(AArgs[lDoArg]),pas.SysUtils.TFloatFormat.ffNumber,9999,lPrec,AFormatSettings);
        } else if ($tmp === "M") {
          if (Checkarg(pas.JS.TJSValueType.jvtFloat,false) || Checkarg(pas.JS.TJSValueType.jvtInteger,true)) lToAdd = $mod.FloatToStrF$1(rtl.getNumber(AArgs[lDoArg]),pas.SysUtils.TFloatFormat.ffCurrency,9999,lPrec,AFormatSettings);
        } else if ($tmp === "S") {
          Checkarg(pas.JS.TJSValueType.jvtString,true);
          lHs = "" + AArgs[lDoArg];
          lIndex = lHs.length;
          if ((lPrec !== -1) && (lIndex > lPrec)) lIndex = lPrec;
          lToAdd = pas.System.Copy(lHs,1,lIndex);
        } else if ($tmp === "P") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          lToAdd = pas.SysUtils.IntToHex(rtl.trunc(AArgs[lDoArg]),31);
        } else if ($tmp === "X") {
          Checkarg(pas.JS.TJSValueType.jvtInteger,true);
          lvq = rtl.trunc(AArgs[lDoArg]);
          lIndex = 31;
          if (lPrec > lIndex) {
            lToAdd = pas.SysUtils.IntToHex(lvq,lIndex)}
           else {
            lIndex = 1;
            while ((rtl.shl(1,lIndex * 4) <= lvq) && (lIndex < 16)) lIndex += 1;
            if (lIndex > lPrec) lPrec = lIndex;
            lToAdd = pas.SysUtils.IntToHex(lvq,lPrec);
          };
        } else if ($tmp === "%") lToAdd = "%";
        if (lWidth !== -1) if (lToAdd.length < lWidth) if (!lLeft) {
          lToAdd = pas.System.StringOfChar(" ",lWidth - lToAdd.length) + lToAdd}
         else lToAdd = lToAdd + pas.System.StringOfChar(" ",lWidth - lToAdd.length);
        Result = Result + lToAdd;
      };
      lChPos += 1;
      lOldPos = lChPos;
    };
    return Result;
  };
  this.FormatFloat = function (AFormat, AValue) {
    var Result = "";
    Result = $mod.FormatFloat$1(AFormat,AValue,$mod.FormatSettings);
    return Result;
  };
  var cMaxPrecision = 18;
  this.FormatFloat$1 = function (AFormat, AValue, AFormatSettings) {
    var Result = "";
    var lExtended = 0.0;
    var lFloatRec = pas.SysUtils.TFloatRec.$new();
    var lSection = "";
    var lSectionLength = 0;
    var lThousandSep = false;
    var lIsScientific = false;
    var lDecimalPos = 0;
    var lFirstDigit = 0;
    var lLastDigit = 0;
    var lRequestedDigits = 0;
    var lExpSize = 0;
    var lAvailable = 0;
    var lCurrent = 0;
    var lPadZeroes = 0;
    var lDistToDecimal = 0;
    function InitVars() {
      lExtended = AValue;
      lSection = "";
      lSectionLength = 0;
      lThousandSep = false;
      lIsScientific = false;
      lDecimalPos = 0;
      lFirstDigit = 2147483647;
      lLastDigit = 0;
      lRequestedDigits = 0;
      lExpSize = 0;
      lAvailable = -1;
    };
    function ToResult(AChar) {
      Result = Result + AChar;
    };
    function AddToResult(AStr) {
      Result = Result + AStr;
    };
    function WriteDigit(ADigit) {
      if (ADigit === "\x00") return;
      lDistToDecimal -= 1;
      if (lDistToDecimal === -1) {
        AddToResult(AFormatSettings.DecimalSeparator);
        ToResult(ADigit);
      } else {
        ToResult(ADigit);
        if (lThousandSep && ((lDistToDecimal % 3) === 0) && (lDistToDecimal > 1)) AddToResult(AFormatSettings.ThousandSeparator);
      };
    };
    function GetDigit() {
      var Result = "";
      Result = "\x00";
      if (lCurrent <= lAvailable) {
        Result = lFloatRec.Digits[lCurrent];
        lCurrent += 1;
      } else if (lDistToDecimal <= lLastDigit) {
        lDistToDecimal -= 1}
       else Result = "0";
      return Result;
    };
    function CopyDigit() {
      if (lPadZeroes === 0) {
        WriteDigit(GetDigit())}
       else if (lPadZeroes < 0) {
        lPadZeroes += 1;
        if (lDistToDecimal <= lFirstDigit) {
          WriteDigit("0")}
         else lDistToDecimal -= 1;
      } else {
        while (lPadZeroes > 0) {
          WriteDigit(GetDigit());
          lPadZeroes -= 1;
        };
        WriteDigit(GetDigit());
      };
    };
    function GetSections(APosArray) {
      var Result = 0;
      var lFloat = 0;
      var lCount = 0;
      var lChar = "";
      var lQuote = "";
      var lInQuote = false;
      Result = 1;
      APosArray.get()[1] = -1;
      APosArray.get()[2] = -1;
      APosArray.get()[3] = -1;
      lInQuote = false;
      lQuote = "\x00";
      lCount = 1;
      lFloat = AFormat.length;
      while (lCount <= lFloat) {
        lChar = AFormat.charAt(lCount - 1);
        var $tmp = lChar;
        if ($tmp === ";") {
          if (!lInQuote) {
            if (Result > 3) throw pas.SysUtils.Exception.$create("Create$1",["Invalid float format"]);
            APosArray.get()[Result] = lCount + 1;
            Result += 1;
          };
        } else if (($tmp === '"') || ($tmp === "'")) {
          if (lInQuote) {
            lInQuote = lChar !== lQuote}
           else {
            lInQuote = true;
            lQuote = lChar;
          };
        };
        lCount += 1;
      };
      if (APosArray.get()[Result] === -1) APosArray.get()[Result] = lFloat + 1;
      return Result;
    };
    function AnalyzeFormat() {
      var lCount = 0;
      var lLength = 0;
      var lQuote = "";
      var lChar = "";
      var lInQuote = false;
      lLength = $mod.TStringHelper.get_Length.call({get: function () {
          return lSection;
        }, set: function (v) {
          lSection = v;
        }});
      lCount = 1;
      lInQuote = false;
      lQuote = "\x00";
      while (lCount <= lLength) {
        lChar = lSection.charAt(lCount - 1);
        if (lChar.charCodeAt() in rtl.createSet(34,39)) {
          if (lInQuote) {
            lInQuote = lChar !== lQuote}
           else {
            lInQuote = true;
            lQuote = lChar;
          };
        } else if (!lInQuote) {
          var $tmp = lChar;
          if ($tmp === ".") {
            if (lDecimalPos === 0) lDecimalPos = lRequestedDigits + 1;
          } else if ($tmp === ",") {
            lThousandSep = AFormatSettings.ThousandSeparator !== "\x00";
          } else if (($tmp === "e") || ($tmp === "E")) {
            lCount += 1;
            if (lCount < lLength) {
              lChar = lSection.charAt(lCount - 1);
              lIsScientific = lChar.charCodeAt() in rtl.createSet(45,43);
              if (lIsScientific) {
                while ((lCount < lLength) && (lSection.charAt((lCount + 1) - 1) === "0")) {
                  lExpSize += 1;
                  lCount += 1;
                };
              };
              if (lExpSize > 4) lExpSize = 4;
            };
          } else if ($tmp === "#") {
            lRequestedDigits += 1;
          } else if ($tmp === "0") {
            if (lRequestedDigits < lFirstDigit) lFirstDigit = lRequestedDigits + 1;
            lRequestedDigits += 1;
            lLastDigit = lRequestedDigits + 1;
          };
        };
        lCount += 1;
      };
      if (lDecimalPos === 0) lDecimalPos = lRequestedDigits + 1;
      lLastDigit = lDecimalPos - lLastDigit;
      if (lLastDigit > 0) lLastDigit = 0;
      lFirstDigit = lDecimalPos - lFirstDigit;
      if (lFirstDigit < 0) lFirstDigit = 0;
    };
    function ValueOutSideScope() {
      var Result = false;
      Result = ((lFloatRec.Exponent >= 18) && !lIsScientific) || (lFloatRec.Exponent === 0x7FF) || (lFloatRec.Exponent === 0x800);
      return Result;
    };
    function CalcRunVars() {
      var lDigit = 0;
      var lPrecision = 0;
      if (lIsScientific) {
        lPrecision = lRequestedDigits;
        lDigit = 9999;
      } else {
        lPrecision = 18;
        lDigit = (lRequestedDigits - lDecimalPos) + 1;
      };
      lFloatRec.$assign(pas.SysUtils.FloatToDecimal(AValue,lPrecision,lDigit));
      lDistToDecimal = lDecimalPos - 1;
      if (lIsScientific) {
        lPadZeroes = 0}
       else {
        lPadZeroes = lFloatRec.Exponent - (lDecimalPos - 1);
        if (lPadZeroes >= 0) lDistToDecimal = lFloatRec.Exponent;
      };
      lAvailable = -1;
      while ((lAvailable < 18) && (lFloatRec.Digits[lAvailable + 1] !== "\x00")) lAvailable += 1;
    };
    function FormatExponent(ASign, AExponent) {
      var Result = "";
      Result = $mod.TLongIntHelper.ToString.call({get: function () {
          return AExponent;
        }, set: function (v) {
          rtl.raiseE("EPropReadOnly");
        }});
      Result = pas.System.StringOfChar("0",lExpSize - $mod.TStringHelper.get_Length.call({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) + Result;
      if (AExponent < 0) {
        Result = "-" + Result}
       else if ((AExponent > 0) && (ASign === "+")) Result = ASign + Result;
      return Result;
    };
    var lCount = 0;
    var lString = 0;
    var lChar = "";
    var lQuote = "";
    var lPosArray = [];
    var lInLiteral = false;
    lPosArray = rtl.arraySetLength(lPosArray,0,4);
    Result = "";
    InitVars();
    if (lExtended > 0) {
      lString = 1}
     else if (lExtended < 0) {
      lString = 2}
     else lString = 3;
    lPosArray[0] = 0;
    lCount = GetSections({get: function () {
        return lPosArray;
      }, set: function (v) {
        lPosArray = v;
      }});
    if ((lCount < lString) || ((lPosArray[lString] - lPosArray[lString - 1]) === 0)) lString = 1;
    lSectionLength = lPosArray[lString] - lPosArray[lString - 1] - 1;
    lSection = pas.System.Copy(AFormat,lPosArray[lString - 1] + 1,lSectionLength);
    lSection = rtl.strSetLength(lSection,lSectionLength);
    AnalyzeFormat();
    CalcRunVars();
    if ((lSectionLength === 0) || ValueOutSideScope()) {
      lSection = lExtended.toPrecision(15);
      Result = lSection;
    };
    lCount = 1;
    lCurrent = 0;
    lQuote = " ";
    lInLiteral = false;
    if (lFloatRec.Negative && (lString === 1)) ToResult("-");
    while (lCount <= lSectionLength) {
      lChar = lSection.charAt(lCount - 1);
      if (lChar.charCodeAt() in rtl.createSet(34,39)) {
        if (lInLiteral) {
          lInLiteral = lChar !== lQuote}
         else {
          lInLiteral = true;
          lQuote = lChar;
        };
      } else if (lInLiteral) {
        ToResult(lChar)}
       else {
        var $tmp = lChar;
        if (($tmp === "0") || ($tmp === "#")) {
          CopyDigit();
        } else if (($tmp === ".") || ($tmp === ",")) {}
        else if (($tmp === "e") || ($tmp === "E")) {
          ToResult(lChar);
          lCount += 1;
          if (lCount <= lSection.length) {
            lChar = lSection.charAt(lCount - 1);
            if (lChar.charCodeAt() in rtl.createSet(43,45)) {
              AddToResult(FormatExponent(lChar,(lFloatRec.Exponent - lDecimalPos) + 1));
              while ((lCount < lSectionLength) && (lSection.charAt((lCount + 1) - 1) === "0")) lCount += 1;
            };
          };
        } else {
          ToResult(lChar);
        };
      };
      lCount += 1;
    };
    return Result;
  };
  this.ArrayBufferToBase64 = function (Buffer) {
    var Result = "";
    function _arrayBufferToBase64(buf) {
    var binary = '';
    var bytes = new Uint8Array(buf);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[i] );
    }
    return window.btoa(binary);
    }
    Result = _arrayBufferToBase64(Buffer);
    return Result;
  };
  this.Base64ToArrayBuffer = function (Base64) {
    var Result = null;
    function _base64ToArrayBuffer(data) {
            var binary_string = window.atob(data);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
    
        Result = _base64ToArrayBuffer(Base64);
    return Result;
  };
  this.StringToBase64 = function (AValue) {
    var Result = "";
    var res = "";
    res = window.btoa(AValue);
    Result = res;
    return Result;
  };
  this.Base64ToString = function (AValue) {
    var Result = "";
    var res = "";
    res = window.atob(AValue);
    Result = res;
    return Result;
  };
  var cSizeOfDouble = 8;
  this.SizeOf = function (AValue) {
    var Result = 0;
    Result = 8;
    return Result;
  };
  var cSizeOfInteger = 4;
  this.SizeOf$1 = function (AValue) {
    var Result = 0;
    Result = 4;
    return Result;
  };
  this.InsertAfter = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);
  };
  this.FormatSettings = this.TFormatSettings.$new();
  $mod.$implcode = function () {
    $impl.MaxDigits = 15;
    $impl.feInvalidFormat = 1;
    $impl.feMissingArgument = 2;
    $impl.feInvalidArgIndex = 3;
    $impl.FCompare = null;
    rtl.recNewT($impl,"TFormatDateTimeHelper",function () {
      this.$eq = function (b) {
        return true;
      };
      this.$assign = function (s) {
        return this;
      };
      var cAMPMFormat1 = "A\/P";
      var cAMPMFormat2 = "AMPM";
      var cAMPMFormat3 = "AM\/PM";
      this.StoreFormat = function (AResult, AYear, AMonth, ADay, AHour, AMinute, ASecond, AMilliSecond, ADayOfWeek, AFormatStr, AFormatSettings, ADateTime, ANesting, ATimeFlag) {
        var lToken = "";
        var lLastFormatToken = "";
        var lPrevLastToken = "";
        var lCount = 0;
        var lClock12 = false;
        var lBuffer = 0;
        var lIsInterval = false;
        var lTemp = 0;
        var lFormatCurrent = 0;
        var lFormatEnd = 0;
        if (ANesting > 1) return;
        lFormatCurrent = 1;
        lFormatEnd = $mod.TStringHelper.get_Length.call({get: function () {
            return AFormatStr;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }});
        lClock12 = false;
        lIsInterval = false;
        lTemp = 1;
        while (lTemp <= lFormatEnd) {
          lToken = AFormatStr.charAt(lTemp - 1);
          var $tmp = lToken;
          if (($tmp === "'") || ($tmp === '"')) {
            lTemp += 1;
            while ((lTemp < lFormatEnd) && (AFormatStr.charAt(lTemp - 1) !== lToken)) lTemp += 1;
          } else if (($tmp === "A") || ($tmp === "a")) {
            if ($mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat1;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lTemp - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat1;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }}))) || $mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat2;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lTemp - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat2;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }}))) || $mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat3;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lTemp - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat3;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }})))) {
              lClock12 = true;
              break;
            };
          };
          lTemp += 1;
        };
        lToken = "ÿ";
        lLastFormatToken = " ";
        lPrevLastToken = "H";
        while (lFormatCurrent <= lFormatEnd) {
          lToken = AFormatStr.charAt(lFormatCurrent - 1);
          lToken = $mod.TCharHelper.ToUpper.call({get: function () {
              return lToken;
            }, set: function (v) {
              lToken = v;
            }});
          lCount = 1;
          lTemp = lFormatCurrent + 1;
          var $tmp1 = lToken;
          if (($tmp1 === "'") || ($tmp1 === '"')) {
            while ((lTemp < lFormatEnd) && (AFormatStr.charAt(lTemp - 1) !== lToken)) lTemp += 1;
            lTemp += 1;
            lCount = lTemp - lFormatCurrent;
            $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent + 1,lCount - 2);
          } else if ($tmp1 === "A") {
            if ($mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat2;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lFormatCurrent - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat2;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }})))) {
              lCount = 4;
              if (AHour.get() < 12) {
                $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.TimeAMString)}
               else $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.TimePMString);
            } else if ($mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat3;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lFormatCurrent - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat3;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }})))) {
              lCount = 5;
              if (AHour.get() < 12) {
                $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent,2)}
               else $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent + 3,2);
            } else if ($mod.TStringHelper.Equals.call({get: function () {
                return cAMPMFormat1;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},$mod.TStringHelper.Substring$1.call({get: function () {
                return AFormatStr;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }},lFormatCurrent - 1,$mod.TStringHelper.get_Length.call({get: function () {
                return cAMPMFormat1;
              }, set: function (v) {
                rtl.raiseE("EPropReadOnly");
              }})))) {
              lCount = 3;
              if (AHour.get() < 12) {
                $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent,1)}
               else $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent + 2,1);
            } else throw $mod.EConvertError.$create("Create$1",["Illegal character in format string"]);
          } else if ($tmp1 === "\/") {
            $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.DateSeparator);
          } else if ($tmp1 === ":") {
            $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.TimeSeparator)}
           else if (($tmp1 === " ") || ($tmp1 === "C") || ($tmp1 === "D") || ($tmp1 === "H") || ($tmp1 === "M") || ($tmp1 === "N") || ($tmp1 === "S") || ($tmp1 === "T") || ($tmp1 === "Y") || ($tmp1 === "Z") || ($tmp1 === "F")) {
            while ((lTemp <= lFormatEnd) && ($mod.TCharHelper.ToUpper.call({p: $mod.TStringHelper.get_Chars.call({get: function () {
                  return AFormatStr;
                }, set: function (v) {
                  rtl.raiseE("EPropReadOnly");
                }},lTemp - 1), get: function () {
                return this.p;
              }, set: function (v) {
                this.p = v;
              }}) === lToken)) lTemp += 1;
            lCount = lTemp - lFormatCurrent;
            var $tmp2 = lToken;
            if ($tmp2 === " ") {
              $impl.TFormatDateTimeHelper.StoreStr(AResult,AFormatStr,lFormatCurrent,lCount)}
             else if ($tmp2 === "Y") {
              if (lCount > 2) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AYear.get(),4)}
               else $impl.TFormatDateTimeHelper.StoreInt(AResult,AYear.get() % 100,2);
            } else if ($tmp2 === "M") {
              if (lIsInterval && ((lPrevLastToken === "H") || ATimeFlag)) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get() + ((AHour.get() + (pas.System.Trunc(Math.abs(ADateTime)) * 24)) * 60),0)}
               else if ((lLastFormatToken === "H") || ATimeFlag) {
                if (lCount === 1) {
                  $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get(),0)}
                 else $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get(),2);
              } else {
                var $tmp3 = lCount;
                if ($tmp3 === 1) {
                  $impl.TFormatDateTimeHelper.StoreInt(AResult,AMonth.get(),0)}
                 else if ($tmp3 === 2) {
                  $impl.TFormatDateTimeHelper.StoreInt(AResult,AMonth.get(),2)}
                 else if ($tmp3 === 3) {
                  $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.ShortMonthNames[AMonth.get() - 1])}
                 else {
                  $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.LongMonthNames[AMonth.get() - 1]);
                };
              };
            } else if ($tmp2 === "D") {
              var $tmp4 = lCount;
              if ($tmp4 === 1) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,ADay.get(),0)}
               else if ($tmp4 === 2) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,ADay.get(),2)}
               else if ($tmp4 === 3) {
                $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.ShortDayNames[ADayOfWeek.get() - 1])}
               else if ($tmp4 === 4) {
                $impl.TFormatDateTimeHelper.StoreString(AResult,AFormatSettings.LongDayNames[ADayOfWeek.get() - 1])}
               else if ($tmp4 === 5) {
                $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.ShortDateFormat,AFormatSettings,ADateTime,ANesting + 1,false)}
               else {
                $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.LongDateFormat,AFormatSettings,ADateTime,ANesting + 1,false);
              };
            } else if ($tmp2 === "H") {
              if (lIsInterval) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AHour.get() + (pas.System.Trunc(Math.abs(ADateTime)) * 24),0)}
               else if (lClock12) {
                lBuffer = AHour.get() % 12;
                if (lBuffer === 0) lBuffer = 12;
                if (lCount === 1) {
                  $impl.TFormatDateTimeHelper.StoreInt(AResult,lBuffer,0)}
                 else $impl.TFormatDateTimeHelper.StoreInt(AResult,lBuffer,2);
              } else {
                if (lCount === 1) {
                  $impl.TFormatDateTimeHelper.StoreInt(AResult,AHour.get(),0)}
                 else $impl.TFormatDateTimeHelper.StoreInt(AResult,AHour.get(),2);
              }}
             else if ($tmp2 === "N") {
              if (lIsInterval) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get() + ((AHour.get() + (pas.System.Trunc(Math.abs(ADateTime)) * 24)) * 60),0)}
               else if (lCount === 1) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get(),0)}
               else $impl.TFormatDateTimeHelper.StoreInt(AResult,AMinute.get(),2)}
             else if ($tmp2 === "S") {
              if (lIsInterval) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,ASecond.get() + ((AMinute.get() + ((AHour.get() + (pas.System.Trunc(Math.abs(ADateTime)) * 24)) * 60)) * 60),0)}
               else if (lCount === 1) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,ASecond.get(),0)}
               else $impl.TFormatDateTimeHelper.StoreInt(AResult,ASecond.get(),2)}
             else if ($tmp2 === "Z") {
              if (lCount === 1) {
                $impl.TFormatDateTimeHelper.StoreInt(AResult,AMilliSecond.get(),0)}
               else $impl.TFormatDateTimeHelper.StoreInt(AResult,AMilliSecond.get(),3)}
             else if ($tmp2 === "T") {
              if (lCount === 1) {
                $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.ShortTimeFormat,AFormatSettings,ADateTime,ANesting + 1,true)}
               else $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.LongTimeFormat,AFormatSettings,ADateTime,ANesting + 1,true)}
             else if ($tmp2 === "C") {
              $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.ShortDateFormat,AFormatSettings,ADateTime,ANesting + 1,false);
              if ((AHour.get() !== 0) || (AMinute.get() !== 0) || (ASecond.get() !== 0)) {
                $impl.TFormatDateTimeHelper.StoreString(AResult," ");
                $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.LongTimeFormat,AFormatSettings,ADateTime,ANesting + 1,true);
              };
            } else if ($tmp2 === "F") {
              $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.ShortDateFormat,AFormatSettings,ADateTime,ANesting + 1,false);
              $impl.TFormatDateTimeHelper.StoreString(AResult," ");
              $impl.TFormatDateTimeHelper.StoreFormat(AResult,AYear,AMonth,ADay,AHour,AMinute,ASecond,AMilliSecond,ADayOfWeek,AFormatSettings.LongTimeFormat,AFormatSettings,ADateTime,ANesting + 1,true);
            };
            lPrevLastToken = lLastFormatToken;
            lLastFormatToken = lToken;
          } else {
            $impl.TFormatDateTimeHelper.StoreString(AResult,lToken);
          };
          lFormatCurrent += lCount;
        };
      };
      var cFillChar = "0";
      this.StoreInt = function (AResult, AValue, ADigits) {
        var lBuffer = "";
        lBuffer = $mod.TLongIntHelper.ToString.call({get: function () {
            return AValue;
          }, set: function (v) {
            rtl.raiseE("EPropReadOnly");
          }});
        while ($mod.TStringHelper.get_Length.call({get: function () {
            return lBuffer;
          }, set: function (v) {
            lBuffer = v;
          }}) < ADigits) lBuffer = cFillChar + lBuffer;
        $impl.TFormatDateTimeHelper.StoreString(AResult,lBuffer);
      };
      this.StoreStr = function (AResult, AFormatStr, APos, ALength) {
        AResult.set(AResult.get() + pas.System.Copy(AFormatStr,APos,ALength));
      };
      this.StoreString = function (AResult, AString) {
        AResult.set(AResult.get() + AString);
      };
      this.FormatDateTime = function (AFormatStr, AFormatSettings, ADateTime) {
        var Result = "";
        var lYear = 0;
        var lMonth = 0;
        var lDay = 0;
        var lDayOfWeek = 0;
        var lHour = 0;
        var lMinute = 0;
        var lSecond = 0;
        var lMilliSecond = 0;
        Result = "";
        pas.SysUtils.DecodeDateFully(ADateTime,{get: function () {
            return lYear;
          }, set: function (v) {
            lYear = v;
          }},{get: function () {
            return lMonth;
          }, set: function (v) {
            lMonth = v;
          }},{get: function () {
            return lDay;
          }, set: function (v) {
            lDay = v;
          }},{get: function () {
            return lDayOfWeek;
          }, set: function (v) {
            lDayOfWeek = v;
          }});
        pas.SysUtils.DecodeTime(ADateTime,{get: function () {
            return lHour;
          }, set: function (v) {
            lHour = v;
          }},{get: function () {
            return lMinute;
          }, set: function (v) {
            lMinute = v;
          }},{get: function () {
            return lSecond;
          }, set: function (v) {
            lSecond = v;
          }},{get: function () {
            return lMilliSecond;
          }, set: function (v) {
            lMilliSecond = v;
          }});
        if (AFormatStr !== "") {
          $impl.TFormatDateTimeHelper.StoreFormat({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},{get: function () {
              return lYear;
            }, set: function (v) {
              lYear = v;
            }},{get: function () {
              return lMonth;
            }, set: function (v) {
              lMonth = v;
            }},{get: function () {
              return lDay;
            }, set: function (v) {
              lDay = v;
            }},{get: function () {
              return lHour;
            }, set: function (v) {
              lHour = v;
            }},{get: function () {
              return lMinute;
            }, set: function (v) {
              lMinute = v;
            }},{get: function () {
              return lSecond;
            }, set: function (v) {
              lSecond = v;
            }},{get: function () {
              return lMilliSecond;
            }, set: function (v) {
              lMilliSecond = v;
            }},{get: function () {
              return lDayOfWeek;
            }, set: function (v) {
              lDayOfWeek = v;
            }},AFormatStr,AFormatSettings,ADateTime,0,false)}
         else $impl.TFormatDateTimeHelper.StoreFormat({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},{get: function () {
            return lYear;
          }, set: function (v) {
            lYear = v;
          }},{get: function () {
            return lMonth;
          }, set: function (v) {
            lMonth = v;
          }},{get: function () {
            return lDay;
          }, set: function (v) {
            lDay = v;
          }},{get: function () {
            return lHour;
          }, set: function (v) {
            lHour = v;
          }},{get: function () {
            return lMinute;
          }, set: function (v) {
            lMinute = v;
          }},{get: function () {
            return lSecond;
          }, set: function (v) {
            lSecond = v;
          }},{get: function () {
            return lMilliSecond;
          }, set: function (v) {
            lMilliSecond = v;
          }},{get: function () {
            return lDayOfWeek;
          }, set: function (v) {
            lDayOfWeek = v;
          }},"C",AFormatSettings,ADateTime,0,false);
        return Result;
      };
      var $r = $mod.$rtti.$Record("TFormatDateTimeHelper",{});
      $r.addMethod("FormatDateTime",5,[["AFormatStr",rtl.string,2],["AFormatSettings",$mod.$rtti["TFormatSettings"],2],["ADateTime",pas.System.$rtti["TDateTime"],2]],rtl.string,1);
    });
    var cWhiteSpace = " \b\t\n\f\r";
    var cDigits = "0123456789";
    $impl.IntStrToDate = function (AErrorMsg, AString, AUseFormat, AFormatSettings) {
      var Result = 0.0;
      function FixErrorMsg(AErrMarg) {
        AErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SInvalidDateFormat"),[AErrMarg]));
      };
      var lCode = 0;
      var lCount = 0;
      var lDateFormat = "";
      var lDay = 0;
      var lDayPos = 0;
      var lDayValues = 0;
      var lLen = 0;
      var lMonth = 0;
      var lMonthPos = 0;
      var lMonthValues = 0;
      var lNumSep = 0;
      var lS1 = "";
      var lSeparator = "";
      var lValues = [];
      var lWhich = 0;
      var lYear = 0;
      var lYearMoreThenTwoDigits = false;
      var lYearPos = 0;
      var lYearValues = 0;
      lValues = rtl.arraySetLength(lValues,0,4);
      Result = 0;
      lLen = AString.length;
      AErrorMsg.set("");
      while ((lLen > 0) && (pas.System.Pos(AString.charAt(lLen - 1),cWhiteSpace) > 0)) lLen -= 1;
      if (lLen === 0) {
        FixErrorMsg(AString);
        return Result;
      };
      lYearMoreThenTwoDigits = false;
      lSeparator = AFormatSettings.DateSeparator;
      if (lSeparator === "\x00") lSeparator = "-";
      lDateFormat = pas.SysUtils.UpperCase(AUseFormat);
      lYearPos = 0;
      lMonthPos = 0;
      lDayPos = 0;
      lWhich = 0;
      lCount = 0;
      while ((lCount < lDateFormat.length) && (lWhich < 3)) {
        lCount += 1;
        var $tmp = lDateFormat.charAt(lCount - 1);
        if ($tmp === "Y") {
          if (lYearPos === 0) {
            lWhich += 1;
            lYearPos = lWhich;
          }}
         else if ($tmp === "M") {
          if (lMonthPos === 0) {
            lWhich += 1;
            lMonthPos = lWhich;
          }}
         else if ($tmp === "D") if (lDayPos === 0) {
          lWhich += 1;
          lDayPos = lWhich;
        };
      };
      for (lCount = 1; lCount <= 3; lCount++) lValues[lCount] = 0;
      lS1 = "";
      lNumSep = 0;
      for (var $l = 1, $end = lLen; $l <= $end; $l++) {
        lCount = $l;
        if (pas.System.Pos(AString.charAt(lCount - 1),cDigits) > 0) lS1 = lS1 + AString.charAt(lCount - 1);
        if ((lSeparator !== " ") && (AString.charAt(lCount - 1) === " ")) continue;
        if ((AString.charAt(lCount - 1) === lSeparator) || ((lCount === lLen) && (pas.System.Pos(AString.charAt(lCount - 1),cDigits) > 0))) {
          lNumSep += 1;
          if (lNumSep > 3) {
            FixErrorMsg(AString);
            return Result;
          };
          if ((lNumSep === lYearPos) && (lS1.length > 2)) lYearMoreThenTwoDigits = true;
          pas.System.val$6(lS1,{a: lNumSep, p: lValues, get: function () {
              return this.p[this.a];
            }, set: function (v) {
              this.p[this.a] = v;
            }},{get: function () {
              return lCode;
            }, set: function (v) {
              lCode = v;
            }});
          if (lCode !== 0) {
            FixErrorMsg(AString);
            return Result;
          };
          lS1 = "";
        } else if (pas.System.Pos(AString.charAt(lCount - 1),cDigits) === 0) {
          FixErrorMsg(AString);
          return Result;
        };
      };
      if ((lWhich < 3) && (lNumSep > lWhich)) {
        FixErrorMsg(AString);
        return Result;
      };
      pas.SysUtils.DecodeDate(pas.SysUtils.Date(),{get: function () {
          return lYear;
        }, set: function (v) {
          lYear = v;
        }},{get: function () {
          return lMonth;
        }, set: function (v) {
          lMonth = v;
        }},{get: function () {
          return lDay;
        }, set: function (v) {
          lDay = v;
        }});
      if (lNumSep === 3) {
        lYearValues = lValues[lYearPos];
        lMonthValues = lValues[lMonthPos];
        lDayValues = lValues[lDayPos];
      } else {
        lYearValues = lYear;
        if (lNumSep < 2) {
          lDayValues = lValues[1];
          lMonthValues = lMonth;
        } else if (lDayPos < lMonthPos) {
          lDayValues = lValues[1];
          lMonthValues = lValues[2];
        } else {
          lDayValues = lValues[2];
          lMonthValues = lValues[1];
        };
      };
      if ((lYearValues >= 0) && (lYearValues < 100) && !lYearMoreThenTwoDigits) {
        lYear = lYear - AFormatSettings.TwoDigitYearCenturyWindow;
        lYearValues += rtl.trunc(lYear / 100) * 100;
        if ((AFormatSettings.TwoDigitYearCenturyWindow > 0) && (lYearValues < lYear)) lYearValues += 100;
      };
      if (!pas.SysUtils.TryEncodeDate(lYearValues,lMonthValues,lDayValues,{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) AErrorMsg.set(rtl.getResStr(pas.RTLConsts,"SErrInvalidDate"));
      return Result;
    };
    var cWhiteSpace$1 = "\t\n\r ";
    $impl.SplitDateTimeStr = function (ADateTimeStr, ADateStr, ATimeStr, AFormatSettings) {
      var Result = 0;
      var lPos = 0;
      var lDummyDT = 0.0;
      Result = 0;
      ADateStr.set("");
      ATimeStr.set("");
      ADateTimeStr = pas.SysUtils.Trim(ADateTimeStr);
      if (ADateTimeStr.length === 0) return Result;
      if ((AFormatSettings.DateSeparator === " ") && (AFormatSettings.TimeSeparator === " ") && (pas.System.Pos(" ",ADateTimeStr) > 0)) {
        ADateStr.set(ADateTimeStr);
        return 1;
      };
      lPos = 1;
      if (AFormatSettings.DateSeparator !== " ") {
        while ((lPos < ADateTimeStr.length) && !(pas.System.Pos(ADateTimeStr.charAt((lPos + 1) - 1),cWhiteSpace$1) > 0)) lPos += 1;
      } else {
        lPos = pas.System.Pos(AFormatSettings.TimeSeparator,ADateTimeStr);
        if (lPos !== 0) do {
          lPos -= 1;
        } while (!((lPos === 0) || (pas.System.Pos(ADateTimeStr.charAt(lPos - 1),cWhiteSpace$1) > 0)));
      };
      if (lPos === 0) lPos = ADateTimeStr.length;
      ADateStr.set(pas.System.Copy(ADateTimeStr,1,lPos));
      ATimeStr.set(pas.SysUtils.Trim(pas.System.Copy(ADateTimeStr,lPos + 1,100)));
      if (ATimeStr.get().length !== 0) {
        Result = 2}
       else {
        Result = 1;
        if (((AFormatSettings.DateSeparator !== AFormatSettings.TimeSeparator) && (pas.System.Pos(AFormatSettings.TimeSeparator,ADateStr.get()) > 0)) || ((AFormatSettings.DateSeparator === AFormatSettings.TimeSeparator) && !$mod.TryStrToDate$1(ADateStr.get(),{get: function () {
            return lDummyDT;
          }, set: function (v) {
            lDummyDT = v;
          }},AFormatSettings))) {
          ATimeStr.set(ADateStr.get());
          ADateStr.set("");
        };
      };
      return Result;
    };
    var AMPM_None = 0;
    var AMPM_AM = 1;
    var AMPM_PM = 2;
    var tiHour = 0;
    var tiMin = 1;
    var tiSec = 2;
    var tiMSec = 3;
    var Digits = "0123456789";
    $impl.IntStrToTime = function (AErrorMsg, AValue, ALen, AFormatSettings) {
      var Result = 0.0;
      var lAmPm = 0;
      var lTimeValues = [];
      var lSeparator = "";
      function SplitElements(ATimeValues, AAmPm) {
        var Result = false;
        var lCur = 0;
        var lOffset = 0;
        var lElemLen = 0;
        var lErr = 0;
        var lTimeIndex = 0;
        var lFirstSignificantDigit = 0;
        var lValue = 0;
        var lDigitPending = false;
        var lMSecPending = false;
        var lAmPmStr = "";
        var lCurChar = "";
        var lCount = 0;
        var lAllowedChars = "";
        Result = false;
        AAmPm.set(0);
        lMSecPending = false;
        lTimeIndex = 0;
        for (lCount = 0; lCount <= 3; lCount++) ATimeValues.get()[lCount] = 0;
        lCur = 1;
        while ((lCur < ALen) && (AValue.charAt(lCur - 1) === " ")) lCur += 1;
        lOffset = lCur;
        if ((lCur > (ALen - 1)) || (AValue.charAt(lCur - 1) === lSeparator) || (AValue.charAt(lCur - 1) === AFormatSettings.DecimalSeparator)) {
          return Result;
        };
        lDigitPending = pas.System.Pos(AValue.charAt(lCur - 1),Digits) > 0;
        while (lCur <= ALen) {
          lCurChar = AValue.charAt(lCur - 1);
          if (pas.System.Pos(lCurChar,Digits) > 0) {
            if (!lDigitPending || (lTimeIndex > 3)) {
              return Result;
            };
            lOffset = lCur;
            if (lCurChar !== "0") {
              lFirstSignificantDigit = lOffset}
             else lFirstSignificantDigit = -1;
            while ((lCur < ALen) && (pas.System.Pos(AValue.charAt((lCur + 1) - 1),Digits) > 0)) {
              if ((lFirstSignificantDigit === -1) && (AValue.charAt(lCur - 1) !== "0")) lFirstSignificantDigit = lCur;
              lCur += 1;
            };
            if (lFirstSignificantDigit === -1) lFirstSignificantDigit = lCur;
            lElemLen = (1 + lCur) - lFirstSignificantDigit;
            if ((lElemLen <= 2) || ((lElemLen <= 3) && (lTimeIndex === 3))) {
              pas.System.val$6(pas.System.Copy(AValue,lFirstSignificantDigit,lElemLen),{get: function () {
                  return lValue;
                }, set: function (v) {
                  lValue = v;
                }},{get: function () {
                  return lErr;
                }, set: function (v) {
                  lErr = v;
                }});
              ATimeValues.get()[lTimeIndex] = lValue;
              lTimeIndex += 1;
              lDigitPending = false;
            } else {
              return Result;
            };
          } else if (lCurChar === " ") {}
          else if (lCurChar === lSeparator) {
            if (lDigitPending || (lTimeIndex > 2)) {
              return Result;
            };
            lDigitPending = true;
            lMSecPending = false;
          } else if (lCurChar === AFormatSettings.DecimalSeparator) {
            if (lDigitPending || lMSecPending || (lTimeIndex !== 3)) {
              return Result;
            };
            lDigitPending = true;
            lMSecPending = true;
          } else {
            if ((AAmPm.get() !== 0) || lDigitPending) {
              return Result;
            };
            lOffset = lCur;
            lAllowedChars = AFormatSettings.DecimalSeparator + " ";
            if (lSeparator !== "\x00") lAllowedChars = lAllowedChars + lSeparator;
            while ((lCur < ALen) && (pas.System.Pos(AValue.charAt((lCur + 1) - 1),lAllowedChars) === 0) && (pas.System.Pos(AValue.charAt((lCur + 1) - 1),Digits) === 0)) lCur += 1;
            lElemLen = (1 + lCur) - lOffset;
            lAmPmStr = pas.System.Copy(AValue,lOffset,lElemLen);
            if (pas.SysUtils.CompareText(lAmPmStr,AFormatSettings.TimeAMString) === 0) {
              AAmPm.set(1)}
             else if (pas.SysUtils.CompareText(lAmPmStr,AFormatSettings.TimePMString) === 0) {
              AAmPm.set(2)}
             else if (pas.SysUtils.CompareText(lAmPmStr,"AM") === 0) {
              AAmPm.set(1)}
             else if (pas.SysUtils.CompareText(lAmPmStr,"PM") === 0) {
              AAmPm.set(2)}
             else {
              return Result;
            };
            if (lTimeIndex === 0) {
              lDigitPending = true}
             else {
              lTimeIndex = 3 + 1;
              lDigitPending = false;
            };
          };
          lCur += 1;
        };
        if ((lTimeIndex === 0) || ((AAmPm.get() !== 0) && ((ATimeValues.get()[0] > 12) || (ATimeValues.get()[0] === 0))) || lDigitPending) return Result;
        Result = true;
        return Result;
      };
      lTimeValues = rtl.arraySetLength(lTimeValues,0,4);
      lSeparator = AFormatSettings.TimeSeparator;
      if (lSeparator === "\x00") lSeparator = ":";
      lAmPm = 0;
      if (!SplitElements({get: function () {
          return lTimeValues;
        }, set: function (v) {
          lTimeValues = v;
        }},{get: function () {
          return lAmPm;
        }, set: function (v) {
          lAmPm = v;
        }})) {
        AErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SErrInvalidTimeFormat"),[AValue]));
        return Result;
      };
      if ((lAmPm === 2) && (lTimeValues[0] !== 12)) {
        lTimeValues[0] += 12}
       else if ((lAmPm === 1) && (lTimeValues[0] === 12)) lTimeValues[0] = 0;
      if (!pas.SysUtils.TryEncodeTime(lTimeValues[0],lTimeValues[1],lTimeValues[2],lTimeValues[3],{get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }})) AErrorMsg.set($mod.Format(rtl.getResStr(pas.RTLConsts,"SErrInvalidTimeFormat"),[AValue]));
      return Result;
    };
    $impl.InternalCompare = function (AItem1, AItem2) {
      var Result = 0;
      Result = $impl.FCompare(rtl.getObject(AItem1),rtl.getObject(AItem2));
      return Result;
    };
    $impl.ReplaceDecimalSep = function (AValue, ADS) {
      var Result = "";
      var lPos = 0;
      lPos = pas.System.Pos(".",AValue);
      if (lPos > 0) {
        Result = pas.System.Copy(AValue,1,lPos - 1) + ADS + pas.System.Copy(AValue,lPos + 1,AValue.length - lPos)}
       else Result = AValue;
      return Result;
    };
    $impl.FormatGeneralFloat = function (AValue, APrecision, ADS) {
      var Result = "";
      var lP = 0;
      var lPE = 0;
      var lQ = 0;
      var lExponent = 0;
      if ((APrecision === -1) || (APrecision > 15)) APrecision = 15;
      Result = rtl.floatToStr(AValue,APrecision + 7);
      Result = pas.SysUtils.TrimLeft(Result);
      lP = pas.System.Pos(".",Result);
      if (lP === 0) return Result;
      lPE = pas.System.Pos("E",Result);
      if (lPE === 0) return $impl.ReplaceDecimalSep(Result,ADS);
      lQ = lPE + 2;
      lExponent = 0;
      while (lQ <= Result.length) {
        lExponent = ((lExponent * 10) + Result.charCodeAt(lQ - 1)) - 48;
        lQ += 1;
      };
      if (Result.charAt((lPE + 1) - 1) === "-") lExponent = -lExponent;
      if (((lP + lExponent) < lPE) && (lExponent > -6)) {
        Result = rtl.strSetLength(Result,lPE - 1);
        if (lExponent >= 0) {
          for (var $l = 0, $end = lExponent - 1; $l <= $end; $l++) {
            lQ = $l;
            Result = rtl.setCharAt(Result,lP - 1,Result.charAt((lP + 1) - 1));
            lP += 1;
          };
          Result = rtl.setCharAt(Result,lP - 1,".");
          lP = 1;
          if (Result.charAt(lP - 1) === "-") lP += 1;
          while ((Result.charAt(lP - 1) === "0") && (lP < Result.length) && (pas.System.Copy(Result,lP + 1,ADS.length) !== ADS)) pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lP,1);
        } else {
          pas.System.Insert(pas.System.Copy("00000",1,-lExponent),{get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lP - 1);
          Result = rtl.setCharAt(Result,lP - lExponent - 1,Result.charAt(lP - lExponent - 1 - 1));
          Result = rtl.setCharAt(Result,lP - 1,".");
          if (lExponent !== -1) Result = rtl.setCharAt(Result,lP - lExponent - 1 - 1,"0");
        };
        lQ = Result.length;
        while ((lQ > 0) && (Result.charAt(lQ - 1) === "0")) lQ -= 1;
        if (Result.charAt(lQ - 1) === ".") lQ -= 1;
        if ((lQ === 0) || ((lQ === 1) && (Result.charAt(0) === "-"))) {
          Result = "0"}
         else Result = rtl.strSetLength(Result,lQ);
      } else {
        while (Result.charAt(lPE - 1 - 1) === "0") {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPE - 1,1);
          lPE -= 1;
        };
        if (Result.charAt(lPE - 1 - 1) === ADS) {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPE - 1,1);
          lPE -= 1;
        };
        if (Result.charAt((lPE + 1) - 1) === "+") {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPE + 1,1)}
         else lPE += 1;
        while (Result.charAt((lPE + 1) - 1) === "0") pas.System.Delete({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},lPE + 1,1);
      };
      Result = $impl.ReplaceDecimalSep(Result,ADS);
      return Result;
    };
    $impl.FormatExponentFloat = function (AValue, APrecision, ADigits, ADS, AFormatSettings) {
      var Result = "";
      var lPos = 0;
      ADS = AFormatSettings.DecimalSeparator;
      if ((APrecision === -1) || (APrecision > 15)) APrecision = 15;
      Result = rtl.floatToStr(AValue,APrecision + 7);
      while (Result.charAt(0) === " ") pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      lPos = pas.System.Pos("E",Result);
      if (lPos === 0) return $impl.ReplaceDecimalSep(Result,ADS);
      lPos += 2;
      if (ADigits > 4) ADigits = 4;
      ADigits = (Result.length - lPos - ADigits) + 1;
      if (ADigits < 0) {
        pas.System.Insert(pas.System.Copy("0000",1,-ADigits),{get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},lPos)}
       else while ((ADigits > 0) && (Result.charAt(lPos - 1) === "0")) {
        pas.System.Delete({get: function () {
            return Result;
          }, set: function (v) {
            Result = v;
          }},lPos,1);
        if (lPos > Result.length) {
          pas.System.Delete({get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPos - 2,2);
          break;
        };
        ADigits -= 1;
      };
      Result = $impl.ReplaceDecimalSep(Result,ADS);
      return Result;
    };
    $impl.FormatFixedFloat = function (AValue, ADigits, ADS) {
      var Result = "";
      if (ADigits === -1) {
        ADigits = 2}
       else if (ADigits > 18) ADigits = 18;
      Result = rtl.floatToStr(AValue,0,ADigits);
      if ((Result !== "") && (Result.charAt(0) === " ")) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      Result = $impl.ReplaceDecimalSep(Result,ADS);
      return Result;
    };
    $impl.FormatNumberFloat = function (AValue, ADigits, ADS, ATS) {
      var Result = "";
      var lPos = 0;
      if (ADigits === -1) {
        ADigits = 2}
       else if (ADigits > 15) ADigits = 15;
      Result = rtl.floatToStr(AValue,0,ADigits);
      if ((Result !== "") && (Result.charAt(0) === " ")) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      lPos = pas.System.Pos(".",Result);
      if (lPos <= 0) lPos = Result.length + 1;
      Result = $impl.ReplaceDecimalSep(Result,ADS);
      lPos -= 3;
      if ((ATS !== "") && (ATS !== "\x00")) {
        while (lPos > 1) {
          if (Result.charAt(lPos - 1 - 1) !== "-") pas.System.Insert(ATS,{get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPos);
          lPos -= 3;
        };
      };
      return Result;
    };
    $impl.RemoveLeadingNegativeSign = function (AValue, ADS, AFormatSettings) {
      var Result = false;
      var lCount = 0;
      var lTS = "";
      var lStartPos = 0;
      Result = false;
      lStartPos = 2;
      lTS = AFormatSettings.ThousandSeparator;
      for (var $l = lStartPos, $end = AValue.get().length; $l <= $end; $l++) {
        lCount = $l;
        Result = (AValue.get().charCodeAt(lCount - 1) in rtl.createSet(48,ADS.charCodeAt(),69,43)) || (AValue.get().charAt(lCount - 1) === lTS);
        if (!Result) break;
      };
      if (Result && (AValue.get().charAt(0) === "-")) pas.System.Delete(AValue,1,1);
      return Result;
    };
    $impl.FormatNumberCurrency = function (AValue, ADigits, ADS, ATS, AFormatSettings) {
      var Result = "";
      var lNegative = false;
      var lPos = 0;
      if (ADigits === -1) {
        ADigits = AFormatSettings.CurrencyDecimals}
       else if (ADigits > 18) ADigits = 18;
      Result = rtl.floatToStr(AValue / 10000,0,ADigits);
      lNegative = Result.charAt(0) === "-";
      if (lNegative) pas.System.Delete({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},1,1);
      lPos = pas.System.Pos(".",Result);
      if (ATS !== "") {
        if (lPos !== 0) {
          Result = $impl.ReplaceDecimalSep(Result,ADS)}
         else lPos = Result.length + 1;
        lPos -= 3;
        while (lPos > 1) {
          pas.System.Insert(ATS,{get: function () {
              return Result;
            }, set: function (v) {
              Result = v;
            }},lPos);
          lPos -= 3;
        };
      };
      if (lNegative) $impl.RemoveLeadingNegativeSign({get: function () {
          return Result;
        }, set: function (v) {
          Result = v;
        }},ADS,AFormatSettings);
      if (!lNegative) {
        var $tmp = AFormatSettings.CurrencyFormat;
        if ($tmp === 0) {
          Result = AFormatSettings.CurrencyString + Result}
         else if ($tmp === 1) {
          Result = Result + AFormatSettings.CurrencyString}
         else if ($tmp === 2) {
          Result = AFormatSettings.CurrencyString + " " + Result}
         else if ($tmp === 3) Result = Result + " " + AFormatSettings.CurrencyString;
      } else {
        var $tmp1 = AFormatSettings.NegCurrFormat;
        if ($tmp1 === 0) {
          Result = "(" + AFormatSettings.CurrencyString + Result + ")"}
         else if ($tmp1 === 1) {
          Result = "-" + AFormatSettings.CurrencyString + Result}
         else if ($tmp1 === 2) {
          Result = AFormatSettings.CurrencyString + "-" + Result}
         else if ($tmp1 === 3) {
          Result = AFormatSettings.CurrencyString + Result + "-"}
         else if ($tmp1 === 4) {
          Result = "(" + Result + AFormatSettings.CurrencyString + ")"}
         else if ($tmp1 === 5) {
          Result = "-" + Result + AFormatSettings.CurrencyString}
         else if ($tmp1 === 6) {
          Result = Result + "-" + AFormatSettings.CurrencyString}
         else if ($tmp1 === 7) {
          Result = Result + AFormatSettings.CurrencyString + "-"}
         else if ($tmp1 === 8) {
          Result = "-" + Result + " " + AFormatSettings.CurrencyString}
         else if ($tmp1 === 9) {
          Result = "-" + AFormatSettings.CurrencyString + " " + Result}
         else if ($tmp1 === 10) {
          Result = Result + " " + AFormatSettings.CurrencyString + "-"}
         else if ($tmp1 === 11) {
          Result = AFormatSettings.CurrencyString + " " + Result + "-"}
         else if ($tmp1 === 12) {
          Result = AFormatSettings.CurrencyString + " " + "-" + Result}
         else if ($tmp1 === 13) {
          Result = Result + "-" + " " + AFormatSettings.CurrencyString}
         else if ($tmp1 === 14) {
          Result = "(" + AFormatSettings.CurrencyString + " " + Result + ")"}
         else if ($tmp1 === 15) Result = "(" + Result + " " + AFormatSettings.CurrencyString + ")";
      };
      return Result;
    };
    $impl.DoFormatError = function (AErrCode, AFmt) {
      var $tmp = AErrCode;
      if ($tmp === 1) {
        throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidFormat"),[AFmt]])}
       else if ($tmp === 2) {
        throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SArgumentMissing"),[AFmt]])}
       else if ($tmp === 3) throw $mod.EConvertError.$create("CreateFmt",[rtl.getResStr(pas.RTLConsts,"SInvalidArgIndex"),[AFmt]]);
    };
  };
  $mod.$init = function () {
    $mod.FormatSettings.$assign($mod.TFormatSettings.Create());
  };
},["RTLConsts","WEBLib.Consts"]);
//# sourceMappingURL=WEBLib.Utils.js.map
