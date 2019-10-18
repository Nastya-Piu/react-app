import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class PostForm extends React.Component {

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

  renderEditor({input, meta}) {
    return (
      <div className="field">
        <CKEditor
          data={input.value}
          editor={ ClassicEditor }
          config={{
            simpleUpload: {
              uploadUrl: 'https://piuserver.herokuapp.com/image-upload'
            },
            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
              'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo']
          }}
          onChange={(event, editor) => {
              return input.onChange(editor.getData())
            }
          }
        />
        {meta.error && meta.touched && <div className="ui pointing red basic label">
          {meta.error}
        </div>}
      </div>
    )
  }

  onSubmit = (post) => {
    post.date = new Date();
    this.createBtn.className = this.createBtn.className + " loading";
    this.props.onSubmit(post);
  };

  render() {
    return (
      <>
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <Field name="title" component={this.renderInput} label="Enter title"/>
        <Field name="description" component={this.renderInput} label="Enter small description"/>
        <Field name="text" component={this.renderEditor} label="Enter text"/><br/>
        <button className="ui button primary" ref={(ref) => this.createBtn = ref }>Create</button>
      </form>
      </>
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