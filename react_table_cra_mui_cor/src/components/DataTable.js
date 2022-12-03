import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
//import { DataGrid } from '@mui/x-data-grid';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Colonnes :
// https://mui.com/components/data-grid/columns/
// Edition :
// https://mui.com/components/data-grid/editing/
// Export :
// https://mui.com/components/data-grid/export/

function CustomToolbar() {
  return (
	<GridToolbarContainer>
	  <GridToolbarExport />
	</GridToolbarContainer>
  );
}

const initialMemberValues = {
	id: 0,
	name: "",
	email: "",
	companyName: ""
};

const errors = {
	empty: 'vide',
	noerror: '',
	invalid: 'Entrez un ID valide',
	existing: 'ID déjà existant'
}

function NewMemberForm(props) {
	
	const [member, setMember] = React.useState(initialMemberValues);
	const [error, setError] = React.useState(errors.empty);

	const handleOnChangeID = React.useCallback((event) => {
		const newID = parseInt(event.target.value, 10);
		if (isNaN(newID) || newID <= 0) {
			setMember({...member, id: 0});
			setError(errors.invalid);
		} else if (props.rows.findIndex(m => m.id === newID) < 0) {
			setMember({...member, id: newID});
			setError(errors.noerror);
		} else {
			setMember({...member, id: newID});
			setError(errors.existing);
		}
	}, [props, member]);
	
	const handleOnClick = React.useCallback((event) => {
		props.onNewMember(member);
		setMember(initialMemberValues);
		setError(errors.empty);
	}, [props, member]);
	
	return (
		<FormGroup row>
			<TextField id="tf-id-error" label="ID" variant="standard" sx={{m: 1}}
			error={error !== errors.empty && error !== errors.noerror}
            helperText={error !== errors.empty ? error : ''}
			onChange={handleOnChangeID}
			value={member.id > 0 ? member.id : ''}
			/>
			<TextField id="tf-name" label="Name" variant="standard" sx={{m: 1}}
			onChange={(e) => {setMember({...member, name: e.target.value});}}
			value={member.name}
			/>
			<TextField id="tf-email" label="Email" variant="standard" sx={{m: 1}}
			onChange={(e) => {setMember({...member, email: e.target.value});}}
			value={member.email}
			/>
			<TextField id="tf-companyName" label="Company name" variant="standard" sx={{m: 1}}
			onChange={(e) => {setMember({...member, companyName: e.target.value});}}
			value={member.companyName}
			/>
			<Button
				size="small"
				variant="outlined"
				color="primary"
				onClick={handleOnClick}
				disabled={error !== ''}
			>
			<KeyboardArrowRightIcon fontSize="small" />Ajouter
			</Button>
		</FormGroup>
	);
}

function DataTable() {
	
	const columns = [
	  {
		field: 'Delete',
		headerName: '',
		width: 20,
		disableExport: true,
		editable: false,
		sortable: false,
		filterable: false,
		renderCell: (params) => (
			  <Button
				onClick={handleDeleteClick(params.id)}
			  >
				<DeleteIcon />
			  </Button>
		)
	  },
	  { field: 'id', type: 'number', headerName: 'ID', width: 100, editable: true },
	  { field: 'name', headerName: 'Name', width: 180, editable: true },
	  {
		  field: 'email',
		  headerName: 'Email',
		  renderCell: (params) => (
			<a href={'mailto:'+params.value}>{params.value}</a>
		  ),
		  width: 200,
		  editable: true
	  },
	  {
		field: 'companyName',
		headerName: 'Company name',
		width: 180,
		editable: true
	  }
	];

  const [rows, setEditRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
	//setEditRows(inputRows);
	axios.get("https://jsonplaceholder.typicode.com/users")
	.then(response => {
		const extractedData = response.data.map(obj => {
			return {id: obj.id, name: obj.name, email: obj.email,
					companyName: obj["company"]["name"]}
				});
		//extractedData[0]['id'] = 123;
		setEditRows(extractedData);
		setLoading(false);
		});
	}, []);
  
  const handleCellEditCommit = React.useCallback((cell) => {
	  setEditRows(
	  rows.map((row) => {
		  if (row.id === cell.id)
			return {...row, [cell.field]: cell.value};
		  else
			return row;
	  })
	  );
  }, [rows]);
  
  const handleDeleteClick = React.useCallback((id) => (event) => {
	  event.stopPropagation();
	  //console.log("Delete", id);
	  setEditRows(rows.filter(row => row.id !== id))
  }, [rows]);
  
  /*
  const handleApplyChanges = React.useCallback(() => {
	  // Inconvénient : on casse l'encapsulation
	  // (même problème si on utilise useRef)
	  const id = document.getElementById("tf-id").value;
	  const name = document.getElementById("tf-name").value;
	  const email = document.getElementById("tf-email").value;
	  const companyName = document.getElementById("tf-companyName").value;
	  const member = {id: id, name: name, email: email, companyName: companyName}
	  setEditRows([...rows, member]);
  }, [rows]);
  */
  
  const handleApplyChanges = React.useCallback((member) => {
	  console.log("Add", member);
	  setEditRows([...rows, member]);
  }, [rows]);
  
  // Pour ajouter la possiblité de sélectionner des lignes :
  // checkboxSelection
  // onSelectionModelChange={handleSelectionModelChange}
  //const handleSelectionModelChange = React.useCallback((selection) => {
  //console.log(selection);
  //}, [rows]);
  
  return (
	<div style={{ height: 400, width: '100%' }}>
	  <Typography variant="h3">
		  Membres de l'organisation
	  </Typography>
	  <Typography sx={{mt:2, mb:2}} variant="h5">
		  Nombre de membres : {rows.length}
	  </Typography>  
	  <DataGrid
		rows={rows}
		loading={loading}
		columns={columns}
		pageSize={5}
		rowsPerPageOptions={[5]}
		disableSelectionOnClick
		editMode='cell'
		onCellEditCommit={handleCellEditCommit}
		components={{
		  Toolbar: CustomToolbar
		}}
	  />
	  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
		  Ajouter un membre
		  </Typography>
        </AccordionSummary>
        <AccordionDetails>
		  <NewMemberForm onNewMember={handleApplyChanges} rows={rows} />
        </AccordionDetails>
      </Accordion>
	</div>
  );
}

export default DataTable;

/*
// Exemple issu de :
// https://mui.com/components/data-grid/columns/

import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';

const initialRows = [
  {
    id: 1,
    name: 'Damien',
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: true,
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Nicolas',
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: 'France',
  },
  {
    id: 3,
    name: 'Kate',
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: 'Brazil',
  },
];

export default function ColumnTypesGrid() {
  const [rows, setRows] = React.useState(initialRows);

  const deleteUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    },
    [],
  );

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
    },
    [],
  );

  const duplicateUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        const newRows = [...prevRows, { ...rowToDuplicate, id: Date.now() }];
        console.log(newRows);
        return newRows;
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'name', type: 'string' },
      { field: 'age', type: 'number' },
      { field: 'dateCreated', type: 'date', width: 130 },
      { field: 'lastLogin', type: 'dateTime', width: 180 },
      { field: 'isAdmin', type: 'boolean', width: 120 },
      {
        field: 'country',
        type: 'singleSelect',
        width: 120,
        valueOptions: [
          'Bulgaria',
          'Netherlands',
          'France',
          'United Kingdom',
          'Spain',
          'Brazil',
        ],
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Toggle Admin"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate User"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin, duplicateUser],
  );

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
*/