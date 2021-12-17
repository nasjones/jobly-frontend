function CompanyDetail({ description, numEmployees }) {
	return (
		<div>
			<p>{description}</p>
			<span>Employees: {numEmployees}</span>
		</div>
	);
}
export default CompanyDetail;
