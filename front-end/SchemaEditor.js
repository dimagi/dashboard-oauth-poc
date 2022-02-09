import React from "react";
import {JSONEditor} from "@json-editor/json-editor/src/core";


class SchemaEditor extends React.Component {
  // based on https://reactjs.org/docs/integrating-with-other-libraries.html#how-to-approach-the-problem
  componentDidMount() {
    console.log(this.props.schema);
    console.log(this.props.dataSource);
    this.editor = new JSONEditor(this.el, {
      schema: this.props.schema,
      theme: 'bootstrap4',
      // disable_edit_json: true,  // hide "edit json" buttons
      disable_properties: true,  // hide "object properties" buttons
    });
    this.editor.setValue(this.props.dataSource);
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  render() {
    return <div ref={el => this.el = el} />;  }
}

export default SchemaEditor;
