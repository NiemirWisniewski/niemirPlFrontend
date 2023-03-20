import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss']
})
export class QuillComponent {

  @Input() content : AbstractControl = new FormControl();
  @Output() private onContentChange = new EventEmitter<string>();

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // Toggled buttons
      ]
    }
  };


  onSelectionChanged(event)  {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged(e) {
    this.onContentChange.emit(e.html);
    if(e.editor.getLength() > 250){
      e.editor.deleteText(250, e.editor.getLength());
    }
  };

  onFocus() {
    console.log('On Focus');
  };

  onBlur() {
    console.log('Blurred');
  };


}
