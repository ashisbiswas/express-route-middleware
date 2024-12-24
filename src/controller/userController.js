const mockUsers = [
    {id: 1, username: 'Ashis', displayName: 'Ashis Biswas'},
    {id: 2, username: 'john_doe', displayName: 'John Doe'},
    {id: 3, username: 'jane_smith', displayName: 'Jane Smith'},
    {id: 4, username: 'sam_rogers', displayName: 'Sam Rogers'},
    {id: 5, username: 'lisa_chen', displayName: 'Lisa Chen'},
    {id: 6, username: 'mike_williams', displayName: 'Mike Williams'},
    {id: 7, username: 'emily_clark', displayName: 'Emily Clark'},
    {id: 8, username: 'daniel_kim', displayName: 'Daniel Kim'},
    {id: 9, username: 'sara_lee', displayName: 'Sara Lee'},
    {id: 10, username: 'kevin_brown', displayName: 'Kevin Brown'}
];

const showUsers = (req, res)=>{

    /**
     * destructure the query paramaters
     */
    const { 
        query: { filter, value } 
    } = req

    /**
     * if query present
     */
    if( filter && value ) {

        return res.status(200).send(
            mockUsers.filter( user => user[filter].toLowerCase().includes(value.toLowerCase()) )
        )
    }

    return res.send(mockUsers)
    
    
}

const getUserById = ( req, res ) => {
    
    /**
     * parse the id as int
     */
    const parsedId = parseInt(req.params.id)

    /**
     * check if id is not other than number
     */
    if( isNaN(parsedId) ) return res.status(400).send({ msg: 'Bad request. Invalid id'})

    
    /**
     * find the user from array
     */
    const findUser = mockUsers.find( user => user.id === parsedId)

    /**
     * if user is not present send 404
     */
    if( !findUser ) res.sendStatus(404)

    res.send(findUser)
}

const addUser = (req, res) =>{
    const { body } = req
    const newUser = {id: mockUsers[ mockUsers.length - 1 ].id +1, ...body }

    mockUsers.push(newUser)
    res.status(201).send(newUser)
}

const updateUser = (req, res) =>{
    
    /**
     * destructure body and params from request
     */
    const { 
        body,
        params: {
            id
        }
    } = req

    /**
     * parsed the id first
     */
    const parsedId = parseInt(id)

    /**
     * if id not number
     */
    if(isNaN(parsedId)) return res.sendStatus(400)

    /**
     * find the user index
     */
    const findUserIndex = mockUsers.findIndex( (user)=> {
        return user.id === parsedId 
    })

    if( findUserIndex === -1 ) return res.sendStatus(404)

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}
    return res.sendStatus(200)
}

const deleteUser = (req, res) => {
    const { params: {id} } = req
    const parsedId = parseInt(id)

    /**
     * if id not number
     */
    if(isNaN(parsedId)) return res.sendStatus(400)

    /**
     * find the user index
     */
    const findUserIndex = mockUsers.findIndex( (user)=> {
        return user.id === parsedId 
    })

    if( findUserIndex === -1 ) return res.sendStatus(404)

    mockUsers.splice(parsedId,1)
    res.status(200).send({ msg: "User deleted"})
}

export { showUsers, getUserById, addUser, updateUser, deleteUser }