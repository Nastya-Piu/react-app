import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Editor, EditorState } from 'draft-js';

class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  renderInput({input, label, meta}) {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {meta.error && meta.touched && <div className="ui pointing red basic label">
          {meta.error}
        </div>}
      </div>
    )
  };

  renderEditor() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }

  onSubmit = (post) => {
    post.date = new Date();
    this.props.onSubmit(post);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <Field name="title" component={this.renderInput} label="Enter title"/>
        <Field name="description" component={this.renderInput} label="Enter small description"/>
        <Field name="text" component={this.renderInput} label="Enter text"/>
        <button className="ui button primary">Create</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if(!formValues.title) {
    errors.title = "You must enter a title";
  }

  if(!formValues.text) {
    errors.text = "You must enter a text";
  }

  if(!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: 'postForm',
  validate: validate
})(PostForm);