import { MatDialog } from '@angular/material/dialog';
import { of} from 'rxjs';

export class MatDialogMock {

    open() {
      return {
        afterClosed: () => of({action: true})
      };
    }
}
