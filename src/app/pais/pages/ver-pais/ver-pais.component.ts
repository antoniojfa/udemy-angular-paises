import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;   // La exclamación indica que puede ser nulo pero que se trate como si trajese información

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

  // PRIMER MÉTODO PARA OBTENER UN PAIS POR ID
  // this.activatedRoute.params
  //   .subscribe( ({ id }) => {
  //     console.log ( id );

  //     this.paisService.getPaisPorAlpha( id )
  //       .subscribe( pais => {
  //         console.log ( pais );
  //       });
  //   });


    // RESUMIR EL MÉTODO ANTERIOR CON AYUDA DE RxJs Y SWITCHMAP
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id ) ),
        tap( console.log )
      )
      .subscribe ( pais => this.pais = pais );      

  }

}
