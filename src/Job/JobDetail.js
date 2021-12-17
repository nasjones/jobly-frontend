function JobDetail({ equity, salary }) {
	return (
		<div>
			<p>Salary: {salary || "unknown"}</p>
			<span>Equity: {equity || "unknown"}</span>
		</div>
	);
}
export default JobDetail;
