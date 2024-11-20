import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/logout/Logout';
import { URLS } from '../constants/urls';
import { deleteData, getData, patchData } from '../utils/api';
import { ProfilePhoto, StyledActionIconsContainer } from './profile.styles';
import Cookies from 'js-cookie';
import UploadFile from '../components/uploadFile/UploadFile';

const Profile = () => {
  const { userData, setUserData, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(setUsers);
	}, [userData]);
	
  if (loading) return <h1>Loading...</h1>;
  if (users.length === 0) return <h1>No users found.</h1>;
  console.log(users);
  return (
    <>
      <h1>
        Hola{' '}
        {userData?.username?.charAt(0).toUpperCase() +
          userData?.username?.slice(1).toLowerCase()}
      </h1>
      <UploadFile userData={userData} setUserData={setUserData} />
      <button onClick={() => navigate('/')}> Go Back</button>
      <Logout />
      <div>
        <div>
          {!userData.image && (
            <ProfilePhoto $color={userData.color}>
              {userData.username.charAt(0).toUpperCase()}
            </ProfilePhoto>
          )}
          {userData.image && (
            <img src={userData.image} alt={userData.username} />
          )}
        </div>

        {users.map(user => (
          <div key={user._id}>
            <div>
              <p>
                {user.username.charAt(0).toUpperCase() +
                  user.username.slice(1).toLowerCase()}
              </p>

              {userData?.username === user.username && (
                <>
                  <StyledActionIconsContainer>
                    <img
                      onClick={() => {
                        visibleEditForm(visible, setVisible);
                      }}
                      src="/images/edit-icon.svg"
                      alt="Edit"
                    />
                    <img
                      onClick={() =>
                        handleDelete(user._id, setUsers, navigate, setUserData)
                      }
                      src="/images/trush-icon.svg"
                      alt="Delete"
                    />
                  </StyledActionIconsContainer>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {visible && (
        <>
          <form
            onSubmit={e => {
              handleEdit(
                e,
                userData.id,
                newUsername,
                setUsers,
                setVisible,
                setUserData,
								userData,
							
              );
            }}
          >
            <div>
              <label htmlFor="newUsername">New Username</label>
              <input
                type="text"
                name="newUsername"
                id="newUsername"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
              />
            </div>
            <div></div>

            <input type="submit" value="Change Username" />
          </form>
        </>
      )}
    </>
  );
};

const visibleEditForm = (visible, setVisible) => {
  setVisible(!visible);
};
const handleDelete = async (id, setUsers, navigate, setUserData) => {
  try {
    await deleteData(`${URLS.API_USERS}/${id}`);
    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
  } catch (err) {
    console.error(err);
  }
  Cookies.remove('token');
  setUserData(null);
  navigate('/');
};

const handleEdit = async (
  event,
  id,
  newUsername,
  setUsers,
  setVisible,
  setUserData,
	userData,
) => {
  event.preventDefault();
  try {
    const updatedUsers = await patchData(`${URLS.API_USERS}/${id}`, {
      username: newUsername
    });
    console.log('UPDATED USERS', updatedUsers);
    setUsers(updatedUsers);
  } catch (error) {
    console.error(error);
  }

	setUserData({
		...userData,
    username: newUsername,
  });
	setVisible(false);
	
};

const fetchUsers = async (setUsers) => {
  try {
    const data = await getData(URLS.API_USERS);
    console.log('Datos de la API:', data); // Aquí ves lo que realmente estás recibiendo
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error('La respuesta no es un arreglo:', data);
      setUsers([]); // Si la respuesta no es un arreglo, establecemos un arreglo vacío
    }
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    setUsers([]); // Establecemos un arreglo vacío en caso de error
  }
};
export default Profile;
