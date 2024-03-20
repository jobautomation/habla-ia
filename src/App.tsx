import './App.css';

import Trigger from '@rc-component/trigger';
import copy from 'copy-to-clipboard';
import { useSetAtom } from "jotai"
import { Fragment, useEffect } from 'react';
import {Toaster, toast} from "react-hot-toast";
import Modal from "react-modal"

import { DialogComponent, useModal } from "./components/Dialog"
import * as icons from "./components/Icons"
import { Menu } from "./components/Menu"
import { PromptBuilder } from "./components/PromptBuilder"
import { TemplateBuilder, compilePrompt } from "./components/TemplateBuilder"
import * as events from "./events";
import * as state from "./state";
import * as subs from "./subs"


function PipeSeparator() {
  return <Fragment>{" | "}</Fragment>;
}


/***
 * Manage Examples
 */


function ExamplesList() {
  let loadExample = useSetAtom(events.loadExampleAtom);
  let exampleId = subs.useLoadedExampleId() || undefined;
  let examples = subs.useSelectedTemplateExampes();
  let exampleOptions = examples.map( (e: any) => {return {key: e.id, label: e.name }} )

  return (
    <Trigger  popup = {<Menu value = {exampleId} options={exampleOptions} onMouseDown = { loadExample }/>}
              popupAlign = {{points: ["tl", "bl"], offset: [0, 5]}}>
      <a>
        <icons.FileTextIcon /> {" Ejemplos (" + examples.length + ")"} <icons.CaretDown />
      </a>
    </Trigger>
  );
}


function ClearExample() {
  let loadExample = useSetAtom(events.loadExampleAtom);
  return (
    <a onClick = {() => loadExample(null)}><icons.CloseCircleIcon /> {" Volver a Empezar"}</a> 
  );  
}

function BuildPromptMenu() {
  
  return (
    <span style={{fontSize: 12}}>
      {" [ "}
      <ExamplesList /> 
      <PipeSeparator/>
      <ClearExample />
      {" ] "}
    </span>
  );
}


/***
 * Complete Prompt
 */

function copyToClipboard(currentPrompt: string) {
  copy(currentPrompt);
  toast.success("Prompt Copiado en Portapapeles");
}

function CurrentPromptMenu() {
  let template = subs.useSelectedTemplate().template;
  let currentValues = subs.useCurrentValues();
  let currentPrompt = compilePrompt(template, currentValues);

  return (
    <span style={{fontSize: 12}}>
      [ <a onClick={() => {copyToClipboard(currentPrompt)}}> <icons.CopyIcon /> Copiar al Portapapeles</a> ]
    </span>
  );
}

function CompletePrompt() {
  let template = subs.useSelectedTemplate().template;
  let currentValues = subs.useCurrentValues();
  let currentPrompt = compilePrompt(template, currentValues);
  
  return (
    <pre className="ready-prompt">
      { currentPrompt ? currentPrompt : "[Prompt vacío, utiliza el Constructor de Prompts para crear un prompt]" }
    </pre>
  );
}


/***
 * Application components
 */

Modal.setAppElement('#root');  // Required by react-modal

function App() {
  let template = subs.useSelectedTemplate();
  let setTemplate = useSetAtom(events.setTemplateAtom);
  let readState = useSetAtom(events.readStateLocalStorageAtom);

  useEffect(() => {
    readState();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Constructor de Prompts: </h1>
        <h2>Crea un Prompt: <BuildPromptMenu/></h2>
        <PromptBuilder promptTemplate={template}/>
        <h2>Resultado: <CurrentPromptMenu /></h2>
        <CompletePrompt />
      </div>
      <TemplateBuilder onSubmit = { setTemplate }/>
      <DialogComponent />
      <Toaster position="bottom-center"/>
    </div>
  );
}

export default App;