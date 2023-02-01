import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit{

  @Input() title: string = "";
  @Input() description: string = "";
  formats: string[] = ["csv", "xml"];
  @Output() exportFormat = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
    
  }

  selectionChanged(e: any){
    console.log(e);
    this.exportFormat.emit(e.source.value);
  }


}
