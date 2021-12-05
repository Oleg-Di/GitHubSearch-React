
import { useContext, useState } from 'react';
import { AlertContext } from './../context/alert/alertContext';
import { GithubContext } from './../context/GitHub/githubContext';


export const Search = () => {
    const [value, setValue] = useState('')
    const {show, hide} = useContext(AlertContext)
    const github = useContext(GithubContext)

    const onSubmit = (e) => {
        if(e.key !== 'Enter') {
        return
        }
        github.clearUsers()
        if (value.trim()) {
            hide()
            github.search(value.trim());
        } else {
            show('Enter users data...')
        }
    }

    return (
        <div className='form-group' style={{marginBottom: '20px'}}>
            <input
            value = {value}
            onChange={e => setValue(e.target.value)}
            onKeyPress = {onSubmit}
            type='text'
            className='form-control'
            placeholder='Enter users name...'
            />
        </div>
    )
}