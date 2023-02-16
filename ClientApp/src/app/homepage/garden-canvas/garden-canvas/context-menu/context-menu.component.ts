import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContextMenuModel } from '../garden-canvas.component';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {

  @Input()
  contextMenuItems: Array<ContextMenuModel>;

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  onContextMenuClick(event, data): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }

}
