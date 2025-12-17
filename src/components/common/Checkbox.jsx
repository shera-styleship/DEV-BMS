import '@components/common/Checkbox.css';

const Checkbox = ({ checked, onChange, children }) => {
	return (
		<label className='checkbox_label'>
			<input type='checkbox' checked={checked} onChange={onChange} />
			<span className='checkbox_box'></span>
			{children}
		</label>
	);
};

export default Checkbox;
