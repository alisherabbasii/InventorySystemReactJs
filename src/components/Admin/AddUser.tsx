import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { addUser, deleteUser, getRoles, getUsers, updateUser } from '../../api/auth';
import { ConfirmationDialog } from '../Generic/ConfirmationDialog';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({ name: '', username: '', password: '', roleId: '' });
    const [editingAdmin, setEditingAdmin] = useState<any>(null);
    const [adminId,setAdminId] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const fetchAdmins = async () => {
        try {
            const response = await getUsers();
            setAdmins(response.data.users);
          } catch (error) {
            console.error('error:', error);
        
          }
    };

    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRoles(response.data.roles);
            
          } catch (error) {
            console.error('error:', error);
        
          }
      
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (editingAdmin) {
            try {
                const response = await updateUser(formData, editingAdmin.id);
                toast.success("User updated successfully!");
              } catch (error) {
                console.error('error:', error);
            
              }
        } else {
            try {
                const response = await addUser(formData);
                toast.success("User added successfully!");
              } catch (error) {
                console.error('error:', error);
            
              }
        }
        setFormData({ name: '', username: '', password: '', roleId: '' });
        setEditingAdmin(null);
        fetchAdmins();
    };


    const handleEdit = (admin:any) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name,
            username: admin.username,
            password: '',
            roleId: admin.RoleId,
        });
    };

    const handleDelete = async () => {
        try {
            const response = await deleteUser(adminId);
            toast.info("User deleted successfully!");
            setShowConfirmation(false);
            setAdminId('');
          } catch (error) {
            console.error('error:', error);
        
          }
        fetchAdmins();
    };

    useEffect(() => {
        fetchAdmins();
        fetchRoles();
    }, []);

    return (
        <div className="p-8">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">{editingAdmin ? 'Edit Admin' : 'Add Admin'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border rounded p-2"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={!editingAdmin}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role</label>
                    <select
                        className="w-full border rounded p-2"
                        value={formData.roleId}
                        onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                        required
                    >
                        <option value="">Select Role</option>
                        {roles.map((role:any) => (
                            <option key={role.id} value={role.id}>
                                {role.role}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editingAdmin ? 'Update' : 'Add'} Admin
                </button>
            </form>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin:any) => (
                        <tr key={admin.id}>
                            <td className="border border-gray-300 p-2">{admin.name}</td>
                            <td className="border border-gray-300 p-2">{admin.username}</td>
                            <td className="border border-gray-300 p-2">{admin.Role.role}</td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(admin)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={()=>{setAdminId(admin.id);setShowConfirmation(true)}}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showConfirmation && 
            <ConfirmationDialog 
                title={'Delete User'}
                message={`Are you sure you want to delete this user?`}
                closeDialog={()=>{setShowConfirmation(false)}}
                confirmText={"Delete"}
                handleConfirm={handleDelete}
            />
        }
        </div>
    );
};

export default AdminManagement;
