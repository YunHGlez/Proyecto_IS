import { useState } from 'react';
import '../assets/styles/TablaBuscar.css';
import '../assets/styles/PaginaPrincipal.css';

export default function ListaTorneos(props) {
  function FilterableTournamentTable({ torneos, rules }) {
    const [filterName, setFilterName] = useState('');
    const [filterID, setFilterID] = useState('');
    const [filterParticipants, setFilterParticipants] = useState('');
    const [filterGame, setFilterGame] = useState('');
    const [filterInitDate, setFilterInitDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterConsole, setFilterConsole] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const resetValues = () => {
      setFilterID('');
      setFilterName('');
      setFilterParticipants('');
      setFilterGame('');
      setFilterInitDate('');
      setFilterEndDate('');
      setFilterConsole('');
      setFilterEmail('');
      setFilterStatus('');
    }
  
    return (
      <div id="search-section">
        <SearchBar
          filterName={filterName} 
          onFilterNameChange={setFilterName}
          filterID={filterID} 
          onFilterIDChange={setFilterID} 
          filterParticipants={filterParticipants} 
          onFilterParticipantsChange={setFilterParticipants}
          filterGame={filterGame} 
          onFilterGameChange={setFilterGame} 
          filterInitDate={filterInitDate} 
          onFilterInitDateChange={setFilterInitDate} 
          filterEndDate={filterEndDate} 
          onFilterEndDateChange={setFilterEndDate} 
          filterConsole={filterConsole} 
          onFilterConsoleChange={setFilterConsole} 
          filterEmail={filterEmail} 
          onFilterEmailChange={setFilterEmail} 
          filterStatus={filterStatus} 
          onFilterStatusChange={setFilterStatus} 
          reset={resetValues}/>
        <TournamentTable 
          torneos={torneos} 
          rules={rules}
          filterName={filterName}
          filterID={filterID}
          filterParticipants={filterParticipants} 
          filterGame={filterGame} 
          filterInitDate={filterInitDate} 
          filterEndDate={filterEndDate} 
          filterConsole={filterConsole} 
          filterEmail={filterEmail} 
          filterStatus={filterStatus} 
          />
      </div>
    );
  }

  function TournamentTable({ torneos, rules, filterName, filterID, filterParticipants,
    filterGame, filterInitDate, filterEndDate, filterConsole, filterEmail, filterStatus }) {
    const rows = [];
  
    torneos.forEach((torneo) => {
      if (filterID !== '' && 
        torneo.idTorneo !== parseInt(filterID)) {
      return;
      }
      if (torneo.nombreTorneo.toLowerCase().indexOf(
            filterName.toLowerCase()) === -1) {
        return;
      }
      if (torneo.numParticipantes !== '' &&
      torneo.numParticipantes > parseInt(filterParticipants)) {
        return;
      }
      if (torneo.juego.toLowerCase().indexOf(
            filterGame.toLowerCase()) === -1) {
        return;
      }
      if (torneo.fechaInicio.indexOf(filterInitDate) === -1) {
        return;
      }
      if (torneo.fechaFin.indexOf(filterEndDate) === -1) {
        return;
      }
      if (torneo.consola.toLowerCase().indexOf(
        filterConsole.toLowerCase()) === -1) {
        return;
      }
      if (torneo.correo.toLowerCase().indexOf(
        filterEmail.toLowerCase()) === -1) {
        return;
      }
      if (torneo.estatus.toLowerCase().indexOf(
        filterStatus.toLowerCase()) === -1) {
        return;
      }
      const rulesTorneo = [];
      rules.forEach((regla) => {
        if(regla.idTorneo === torneo.idTorneo)
          rulesTorneo.push(regla.regla)
      })
      rows.push(<TournamentRow torneo={torneo} key={torneo.id} rules={rulesTorneo}/>);
    });
  
    return (
      <table className='result-table'>
        <thead>
          <tr>
            <th colSpan="4">
            <h3 className='h3JJ'>Lista de Torneos</h3>
            </th>
          </tr>
          <tr id="check">
            <th>ID</th>
            <th>Participantes</th>
            <th>Juego</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
            <th>Nombre torneo</th>
            <th>Consola</th>
            <th>Correo</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  function SearchBar({ filterName, onFilterNameChange, filterID, onFilterIDChange,
    filterParticipants, onFilterParticipantsChange, filterGame, onFilterGameChange,
    filterInitDate, onFilterInitDateChange, filterEndDate, onFilterEndDateChange,
    filterConsole, onFilterConsoleChange, filterEmail, onFilterEmailChange,
    filterStatus, onFilterStatusChange, reset }) {
    return (
      <form className='searchBar'>
        <h3 className='h3JJ'>Búsqueda de Torneos</h3>
        <div className='search-control'>
          <div className='search-control'>
          <label>Filtrar por ID:</label>
            <input id = "searchid" type="number" min="1"
              value={filterID} 
              onChange={(e) => onFilterIDChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por máximos participantes:</label>
            <input id = "searchParticipants" type="number" min="1" 
              value={filterParticipants} placeholder="Search..." 
              onChange={(e) => onFilterParticipantsChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por juego:</label>
            <input id = "searchGame" type="text" 
              value={filterGame} placeholder="Search..." 
              onChange={(e) => onFilterGameChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por fecha de inicio:</label>
            <input id = "searchInitDate" type="date" value={filterInitDate} 
              onChange={(e) => onFilterInitDateChange(e.target.value)} />
          </div> 
          <div className='search-control'>
            <label>Filtrar por fecha de termino:</label>
            <input id = "searchEndDate" type="date" value={filterEndDate} 
              onChange={(e) => onFilterEndDateChange(e.target.value)} />
          </div> 
          <div className='search-control'>
            <label>Filtrar por consola:</label>
            <input id = "searchconsole" type="text" 
              value={filterConsole} placeholder="Search..." 
              onChange={(e) => onFilterConsoleChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por nombrede torneo:</label>
            <input id = "searchname" type="text" 
              value={filterName} placeholder="Search..." 
              onChange={(e) => onFilterNameChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por correo:</label>
            <input id = "searchemail" type="text" 
              value={filterEmail} placeholder="Search..." 
              onChange={(e) => onFilterEmailChange(e.target.value)} />
          </div> 
          <div className='search-control'>
            <label>Filtrar por estatus:</label>
            <select id="searchStatus" value={filterStatus}
            onChange={(e) => onFilterStatusChange(e.target.value)}>
                      <option value=""> - </option>
                      <option value="no iniciado">No iniciado</option>
                      <option value="en curso">En curso</option>
                      <option value="finalizado">Finalizado</option>
                  </select>
          </div>   
        </div>
        <div className='search-actions'>
          <button className="buttonJJ" id="resetValues" type="reset" onClick={() => { reset(); }}>
            Borrar Filtros</button>
        </div>
      </form>
    );
  }


  function TournamentRow({ torneo, rules }) {
    
    const [editInput, setEditInput] = useState(false);

    let content;
    let rulesRows = [];
    if(editInput){
      content = <UpdateFields torneo={torneo} rules={rules} key={torneo.id}/>
    }
    else{
      content = null;
      rulesRows.push(
        <tr className='table-row'>
        <td colSpan="9" style={{textAlign: 'left'}}>
          Reglas del torneo:
        </td>
        </tr>
      )
      rules.forEach((rule) => {
        rulesRows.push(
        <tr className='table-row'>
          <td colSpan="9" style={{textAlign: 'left'}}>
            {rule}
          </td>
        </tr>
        )
      });
    }

    function Update(){
      setEditInput((prev) => {
        if(prev === true){
          return false
        } else{
          return true
        }
      });
    }

    return (
      <>
      <tr className='table-row'>
        <td>{torneo.idTorneo}</td>
        <td>{torneo.numParticipantes}</td>
        <td>{torneo.juego}</td>
        <td>{torneo.fechaInicio}</td>
        <td>{torneo.fechaFin}</td>
        <td>{torneo.nombreTorneo}</td>
        <td>{torneo.consola}</td>
        <td>{torneo.correo}</td>
        <td>{torneo.estatus}</td>
        <td> 
          <button className='buttonJJ' onClick={() => { Update(); }}> 
            Editar</button>
          <button className='buttonJJ' onClick={() => 
            { props.onDeleteTournamentData(torneo);}}>
            Eliminar</button>
        </td>
      </tr>
        {rulesRows}
        {content}
      </>
    );
  }

  function UpdateFields({torneo, rules}){
    const [enteredParticipants, setEnteredParticipants] = useState(torneo.numParticipantes);
    const [enteredGame, setEnteredGame] = useState(torneo.juego);
    const [enteredInitDate, setEnteredInitDate] = useState(torneo.fechaInicio);
    const [enteredEndDate, setEnteredEndDate] = useState(torneo.fechaFin);
    const [enteredName, setEnteredName] = useState(torneo.nombreTorneo);
    const [enteredConsole, setEnteredConsole] = useState(torneo.consola);
    const [enteredEmail, setEnteredEmail] = useState(torneo.correo);
    const [enteredStatus, setEnteredStatus] = useState(torneo.estatus);

    const handleParticipantsChange = (event) => {
        if(event.target.value !== ''){
            setEnteredParticipants(event.target.value);
        }
    };

    const handleGameChange = (event) => {
        if(event.target.value !== ''){
            setEnteredGame(event.target.value);
        }
    };

    const handleInitDateChange = (event) => {
        if(event.target.value !== ''){
            setEnteredInitDate(event.target.value);
        }
    };

    const handleEndDateChange = (event) => {
        if(event.target.value !== ''){
            setEnteredEndDate(event.target.value);
        }
    };

    const handleNameChange = (event) => {
      if(event.target.value !== ''){
        setEnteredName(event.target.value);
      }
    };

    const handleConsoleChange = (event) => {
        if(event.target.value !== ''){
          setEnteredConsole(event.target.value);
        }
      };
  
    const handleEmailChange = (event) => {
      if(event.target.value !== ''){
        setEnteredEmail(event.target.value);
      }
    };
  
    const handleStatusChange = (event) => {
      if(event.target.value !== ''){
        setEnteredStatus(event.target.value);
      }
    };

    const [inputs, setInputs] = useState(rules);
    
    const handleAddInput = () => {
      setInputs([...inputs, ""]);
    };

    const handleInputChange = (event, index) => {
      let value = event.target.value;
      if(value !== ''){
        let onChangeValue = [...inputs];
        onChangeValue[index] = value;
        setInputs(onChangeValue);
      }
    };

    const handleDeleteInput = (index) => {
      const newArray = [...inputs];
      newArray.splice(index, 1);
      console.log(newArray)
      setInputs(newArray);
    };
  
    const submitHandler = (event) => {
      const newTournament = {
        idTorneo: torneo.idTorneo,
        numParticipantes: enteredParticipants,
        juego: enteredGame,
        fechaInicio: enteredInitDate,
        fechaFin: enteredEndDate,
        nombreTorneo: enteredName,
        consola: enteredConsole,
        correo: enteredEmail,
        estatus: enteredStatus
      };
  
      props.onUpdateTournamentData(newTournament, inputs);
      setEnteredParticipants(torneo.numParticipantes);
      setEnteredGame(torneo.juego);
      setEnteredInitDate(torneo.fechaInicio);
      setEnteredEndDate(torneo.fechaFin);
      setEnteredName(torneo.nombreTorneo);
      setEnteredConsole(torneo.consola);
      setEnteredEmail(torneo.correo);
      setEnteredStatus(torneo.estatus);
      setInputs(rules);
  }

    return(
      <>
        <tr className='table-row'>
            <td></td>
            <td><input type="number" min="1" onChange={handleParticipantsChange} required/></td>
            <td><input type="text" placeholder="Nuevo juego" onChange={handleGameChange} required/></td>
            <td><input type="date" onChange={handleInitDateChange} required/></td>
            <td><input type="date" onChange={handleEndDateChange} required/></td>
            <td><input type="text" placeholder="Nuevo nombre" onChange={handleNameChange} required/></td>
            <td><input type="text" placeholder="Nueva consola" onChange={handleConsoleChange} required/></td>
            <td><input type='email' placeholder="Nuevo correo" onChange={handleEmailChange} required/></td>
            <td><select id="searchStatus" onChange={handleStatusChange}>
                      <option value=""> - </option>
                      <option value="no iniciado">No iniciado</option>
                      <option value="en curso">En curso</option>
                      <option value="finalizado">Finalizado</option>
            </select></td>
            <td className='update'><button className='buttonJJ' 
            onClick={() => { submitHandler(torneo.idTorneo); }}> Guardar Cambios</button> </td>
        </tr>
         <tr className='rules-container'>
          <td colSpan="9" style={{textAlign: 'left'}}>
        {inputs.map((item, index) => (
          <>
            <input
              name="rule"
              type="text"
              maxLength="200"
              placeholder={item}
              onChange={(event) => handleInputChange(event, index)}
            />
            {inputs.length > 1 && (
                <button onClick={() => handleDeleteInput(index)}> - </button>
              )}
              {index === inputs.length - 1 && (
                <button onClick={() => handleAddInput()}> + </button>
              )}
          </>
        ))}
        </td>
        </tr>
        </>
    );
  }

  return <FilterableTournamentTable torneos={props.torneos} rules={props.rules}/>;
}
