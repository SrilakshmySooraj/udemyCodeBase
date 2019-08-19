import { Injectable } from '@angular/core';
import { Places } from './places.model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places: Places [] = [
     // tslint:disable-next-line: max-line-length
     new Places('P1', 'Manhatten', 'In the heart of New york city', 'https://s19623.pcdn.co/wp-content/uploads/2018/01/new-york-film-locations.jpg', 233.23, new Date('2019-01-01'),  new Date('2019-01-01')),
     // tslint:disable-next-line: max-line-length
     new Places('P2', 'Chicago', 'The most populous city in Illinois as well as the third most populous city in the United States', 'https://media.timeout.com/images/105439616/630/472/image.jpg', 2233.23, new Date('2019-01-01'),  new Date('2019-01-01')),
     // tslint:disable-next-line: max-line-length
     new Places('P3', 'Connecticut', 'A mid city in the United States', 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTU3ODc5MDg2OTY5MDcxMzI3/old-mystic-in-autumn-2.jpg', 133.23, new Date('2019-01-01'),  new Date('2019-01-01'))
  ];

  get Places() {
    return [...this.places];
  }
  
  constructor() { }
  
  retrive(id: string){
    console.log(id);
    return {...this.places.find(p => p.id === id)};
  }

}
