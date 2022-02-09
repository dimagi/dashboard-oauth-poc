import React from "react";
import {JSONEditor} from "@json-editor/json-editor/src/core";


class SchemaEditor extends React.Component {
  // based on https://reactjs.org/docs/integrating-with-other-libraries.html#how-to-approach-the-problem

  _initializeEditor() {
    this.editor = new JSONEditor(this.el, {
      schema: this.props.schema,
      theme: 'bootstrap4',
      // disable_edit_json: true,  // hide "edit json" buttons
      disable_properties: true,  // hide "object properties" buttons
    });
    this.editor.setValue(this.props.dataSource);
  }

  componentDidMount() {
    this._initializeEditor()
  }

  componentWillUnmount() {
    console.log('unmounting...')
    this.editor.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataSource != this.props.dataSource) {
      if (this.editor) {
        this.editor.destroy();
      }
      this._initializeEditor();
    }
  }

  render() {
    return <div ref={el => this.el = el} />;  }
}

export default SchemaEditor;
