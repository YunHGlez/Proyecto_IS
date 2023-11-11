import { useState } from 'react';
import '../assets/styles/TablaBuscar.css';

export default function ListaAdministradores(props) {
  function FilterableAdminTable({ admins }) {
    const [filterName, setFilterName] = useState('');
    const [filterID, setFilterID] = useState('');
    const [filterEmail, setFilterEmail] = useState('');

    const resetValues = () => {
      setFilterID('');
      setFilterName('');
      setFilterEmail('');
    }
  
    return (
      <div id="search-section">
        <SearchBar
          filterName={filterName} 
          onFilterNameChange={setFilterName}
          filterID={filterID} 
          onFilterIDChange={setFilterID} 
          filterEmail={filterEmail} 
          onFilterEmailChange={setFilterEmail}
          reset={resetValues}/>
        <AdminTable 
          admins={admins} 
          filterName={filterName}
          filterID={filterID}
          filterEmail={filterEmail} 
          />
      </div>
    );
  }

  function AdminTable({ admins, 
    filterName, filterID, filterEmail }) {
    const rows = [];
  
    admins.forEach((admin) => {
      if (filterID !== '' && 
        admin.id !== parseInt(filterID)) {
      return;
      }
      if (admin.name.toLowerCase().indexOf(
            filterName.toLowerCase()) === -1) {
        return;
      }
      if (admin.email.toLowerCase().indexOf(
            filterEmail.toLowerCase()) === -1) {
        return;
      }
      rows.push(<AdminRow admin={admin} key={admin.id}/>);
    });
  
    return (
      <table className='result-table'>
        <thead>
          <tr>
            <th colSpan="4">
            <h3>Lista de Administradores</h3>
            </th>
          </tr>
          <tr id="check">
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  function SearchBar({ filterName, reset, onFilterNameChange, 
    filterID, onFilterIDChange, filterEmail, onFilterEmailChange }) {
    return (
      <form className='searchBar'>
        <h3>Búsqueda de Administradores</h3>
        <div className='search-control'>
          <div className='search-control'>
          <label>Filtrar por ID:</label>
            <input id = "searchid" type="number" min="1"
              value={filterID} placeholder="Search..." 
              onChange={(e) => onFilterIDChange(e.target.value)} />
          </div>  
          <div className='search-control'>
            <label>Filtrar por nombre:</label>
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
        </div>
        <div className='search-actions'>
          <button id="resetValues" type="reset" onClick={() => { reset(); }}>
            Borrar Filtros</button>
        </div>
      </form>
    );
  }


  function AdminRow({ admin }) {
    const [editInput, setEditInput] = useState(false);
    let content;

    if(editInput){
      content = <UpdateFields admin={admin}/>
    }
    else{
      content = null;
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
      <tr className='table-row'>
        <td>{admin.id}</td>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td> 
          <button onClick={() => { Update(); }}> 
            Editar</button>
          <button onClick={() => 
            { props.onDeleteUserData(admin);}}>
            Eliminar</button>
        </td>
        {content}
      </tr>
    );
  }

  function UpdateFields({admin}){
    const [enteredName, setEnteredName] = useState(admin.name);
    const [enteredEmail, setEnteredEmail] = useState(admin.email);
    const [enteredPassword, setEnteredPassword] = useState(admin.password);

    const handleNameChange = (event) => {
      if(event.target.value !== ''){
        setEnteredName(event.target.value);
      }
    };
  
    const handleEmailChange = (event) => {
      if(event.target.value !== ''){
        setEnteredEmail(event.target.value);
      }
    };
  
    const handlePasswordChange = (event) => {
      if(event.target.value !== ''){
        setEnteredPassword(event.target.value);
      }
    };
  
    const submitHandler = (event) => {
      const newAdmin = {
        id: admin.id,
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword
      };
  
      props.onUpdateUserData(newAdmin);
      setEnteredName(admin.name);
      setEnteredEmail(admin.email);
      setEnteredPassword(admin.password);
  }

    return(
      <td className='update'>
        <div className='search-controls'>
            <input type="text" placeholder="Nuevo nombre" onChange={handleNameChange} required/>

            <input type='email' placeholder="Nuevo correo" onChange={handleEmailChange} required/>

            <input type='password' placeholder="Nueva contraseña" onChange={handlePasswordChange} required/>

            <button onClick={() => { submitHandler(admin.id); }}> Guardar Cambios</button>
        </div>
      </td>
    );
  }

  return <FilterableAdminTable admins={props.admins}/>;
}
