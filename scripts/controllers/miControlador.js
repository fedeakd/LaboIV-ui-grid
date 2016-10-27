angular
  .module('app')
  .controller('ConfiguradoTPCtrl', function($scope, data, i18nService, uiGridConstants,NgMap) {
    console.log("holaa");

      $scope.titulo = "Configuracion Campos";
      $scope.gridAmigos = {};
    $scope.gridAmigos.paginationPageSizes = [25, 50, 75];
    $scope.gridAmigos.paginationPageSize = 25;
    $scope.gridAmigos.columnDefs = columnAmigos();
    $scope.gridAmigos.enableFiltering = true;


    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();
    // Activo la busqueda en todos los campos.
    $scope.gridOptions.enableFiltering = true;
    // Configuracion del idioma.
    i18nService.setCurrentLang('es');

    data.data100().then(function(rta){
      console.info(rta);
      // Cargo los datos en la grilla.
      $scope.gridOptions.data = rta;
    });

    console.log(uiGridConstants);
    $scope.MostrarLugar=function(fila){
      $scope.mapa=[];
      $scope.mapa.push({'logitud':fila.logitud,'latitud':fila.latitud})
      $scope.latitud=fila.latitud;
      $scope.logitud=fila.logitud;
      console.log(fila);

    }
    $scope.MostrarAmigos=function(fila){
      $scope.mapa=[];
      fila.amigos.forEach(function(dato) {
        $scope.mapa.push({'logitud':dato.logitud,'latitud':dato.latitud,'nombre':dato.nombre,'imagen':dato.avatar})
      });
      $scope.amigos=fila.amigos;
      $scope.gridAmigos.data=$scope.amigos;
      console.log(fila);

    }

    function columnDefs () {
//ng-map  
//bower install ng-map  incluir en el controller
// boton grid add Scope 
      return [
        { field: 'id', name: '#',  cellTemplate:'<h5>{{row.entity.avatar}}</h5>'},
        { field: 'foto', name: 'foto',  cellTemplate:"<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src >" },
         { field: 'avatar', name: 'avatar',   cellTemplate:"<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src >"},
          {name:'mapa',cellTemplate:'<div><button ng-click="grid.appScope.MostrarLugar(row.entity)">mapa</button></div>'},
           {name:'amigos',cellTemplate:'<div><button ng-click="grid.appScope.MostrarAmigos(row.entity)">amigos</button></div>'},
        { field: 'titulo', name: 'ocupacion'
          ,filter:{
            condition: uiGridConstants.filter.STARTS_WITH,
            placeholder: 'comienza con...'
          }
        },
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'email', name: 'mail'},
        { field: 'sexo', name: 'sexo'
        // filtro de busqueda.
          ,filter: {
            // term: '1',
            type: uiGridConstants.filter.SELECT,
            selectOptions: [
              {value: '1', label: 'Masculino'},
              {value: '2', label: 'Femenino'}
            ]
          }
          //filtro de los datos
          ,cellFilter: 'sexo'
        },
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }



    function  columnAmigos () {
//ng-map  
//bower install ng-map  incluir en el controller
// boton grid add Scope 
      return [
        { field: 'foto', name: 'foto',  cellTemplate:"<img ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src >" },
         { field: 'avatar', name: 'avatar',  cellTemplate:"<img ng-src='{{COL_FIELD}}' alt='HTML5 Icon' >"},
          {name:'mapa',cellTemplate:'<div><button ng-click="grid.appScope.MostrarLugar(row.entity)">mapa</button></div>'},
        { field: 'nombre', name: 'nombre'
          ,enableFiltering: false
        },
        { field: 'apellido', name: 'apellido'},
        { field: 'fechaNacimiento', name: 'fechaNacimiento'
          ,type: 'date'
          ,cellFilter: "date: 'dd-MM-yyyy'"
        }
      ];
    }
  })
