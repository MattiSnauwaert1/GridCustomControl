unit GridCustomControl;

interface

uses
Classes, SysUtils, Types, WEBLib.Controls, WEBLib.StdCtrls, WEBLib.Graphics, WEBLib.Dialogs, Web, JS;

type

TColumnItem = class(TCollectionItem)
  private
    FColumn: string;
  protected
  public
    procedure Assign(Source: TColumnItem); reintroduce;
  published
    property Column: String read FColumn write FColumn;
end;

TColumns = class(TOwnedCollection)
  private
    function GetItem(Index: integer): TColumnItem; reintroduce;
    procedure SetItem(Index: integer; const Value: TColumnItem);
  protected
  public
    constructor Create(AOwner: TComponent);
    function Add: TColumnItem; reintroduce;
    function Insert(Index: integer): TColumnItem; reintroduce;
    property Items[Index: integer]: TColumnItem read GetItem write SetItem; default;
  published
end;

  TVbGrid = Class(TCustomControl)
  private
    gridDiv : TJSElement;
    FPadding: integer;
    FMargin: integer;
    FColCount : integer;
    FColumns: TColumns;
    testGetColumns : TColumns;
    procedure SetMargin(const Value: integer);
    procedure SetPadding(const Value: integer);
   protected
    function CreateElement: TJSElement; override;  
    procedure UpdateElement; override;
    procedure UpdateElementVisual; override;   
    procedure SetColCount(const Value: integer); virtual;
    procedure SetColumns(Value: TColumns);

    property ColCount: integer read FColCount write SetColCount;
  public
    procedure CreateInitialize; override;
    constructor Create(AOwner: TComponent); reintroduce;
    destructor Destroy; override;
    procedure OpenGrid;

  published
    property Margin: integer read FMargin write SetMargin;
    property Padding: integer read FPadding write SetPadding;

    property Columns : TColumns read FColumns write SetColumns;

  end;


implementation


constructor TVbGrid.Create(AOwner: TComponent);
begin
  inherited;

end;

destructor TVbGrid.Destroy;
begin
  FColumns.Free;
  inherited;

end;

constructor TColumns.Create(AOwner: TComponent);
begin
  inherited Create(AOwner, TColumnItem);

end;

procedure TVbGrid.SetColumns(Value: TColumns);
begin
  FColumns.Assign(Value);
end;

procedure TVbGrid.CreateInitialize;
begin
  inherited;
    FPadding := 5;
    FMargin := 10;
    Height := 100;
    Width := 550;  

    FColumns := TColumns.Create(Self);
end;

function TVbGrid.CreateElement: TJSElement;
begin

    Result := document.createElement('DIV');
    gridDiv := document.createElement('DIV');
    
    // Let op : Asyncrone processen
    Result.appendChild(gridDiv); 
    
    //console.log(gridDiv);   

    UpdateElement; 
end;

procedure TVbGrid.UpdateElement;
begin
      AddControlScriptLink('https://unpkg.com/gridjs/dist/gridjs.umd.js');
      //OpenGrid;

end;

procedure TVbGrid.OpenGrid;
var 
  i: Integer;
  c: TColumnItem;
begin
  asm
    let list = [];
  end;
  for i := 0 to FColumns.Count -1 do
    begin
      c := FColumns[i];
      asm
        list.push(c.FColumn);
      end;
    end;
    
  asm
    new gridjs.Grid().updateConfig({
    columns: list
    ,

    data: [
      ["John", "john@gmail.com", "(353) 01 222 3333"],
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
  end;
    SetColCount(FColCount);
end;

procedure TVbGrid.SetColCount(const Value: integer);
var
  delta: integer;
begin
  if (FColCount <> Value) and (Value >= 0) then
  begin
    delta := Value - FColCount;
    FColCount := Value;

    //console.log(FColCount);

    {if Assigned(ElementHandle) then
    begin
      //ColCountChanged(delta);
      console.log(FColCount);
    end;}
  end;
end;

procedure TVbGrid.SetMargin(const Value: integer);
begin
  if (FMargin <> Value) then
  begin
    FMargin := Value;
    UpdateElementVisual;
  end;
end;

procedure TVbGrid.SetPadding(const Value: integer);
begin
  if (FPadding <> Value) then
  begin
    FPadding := Value;
    UpdateElementVisual;
  end;
end;

procedure TVbGrid.UpdateElementVisual;
var
  strpadding: string;
begin
  inherited;
  if Assigned(ElementHandle) then
  begin
    strpadding := IntToStr(Padding)+'px';
      ElementHandle.style.setProperty('padding',strPadding);
  end;
end;

procedure TColumnItem.Assign(Source: TColumnItem);
begin
if (Source is TColumnItem) then
  begin
    FColumn := (Source as TColumnItem).Column;
  end;
end;

function TColumns.Add: TColumnItem;
begin
  Result := TColumnItem(inherited Add);
end;

function TColumns.Insert(Index: integer): TColumnItem;
begin
  Result := TColumnItem(inherited Insert(Index));
end;

function TColumns.GetItem(Index: integer): TColumnItem;
begin
  Result := TColumnItem(inherited Items[Index]);
end;

procedure TColumns.SetItem(Index: integer; const Value: TColumnItem);
begin
  inherited Items[Index] := Value;
end;

end.