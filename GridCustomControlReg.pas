unit GridCustomControlReg;

interface

uses
weblib.DesignIntf, GridCustomControl, Classes;

type
    TVbGridLibraryRequirementsEditor = class(TLibraryRequirementsEditor)
    procedure RequiresLibraries(Proc: TGetStrProc); override;
  end;

procedure Register;

implementation


procedure TVbGridLibraryRequirementsEditor.RequiresLibraries(
  Proc: TGetStrProc);
begin
  Proc('<script src="https://unpkg.com/gridjs/dist/gridjs.umd.js" type="text/javascript"></script>');
  Proc('<link href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" rel="stylesheet"/>');
end;

procedure Register;
begin
   
    RegisterLibraryRequirementsEditor(TVbGrid, TVbGridLibraryRequirementsEditor);
    RegisterComponents('New Grid',[TVbGrid]);
end;


end.
