var teamSetup = React.createClass({
	render: function() {
		return (
			<select id="division">
				<option value>-- DIVISION --</option>
				<option value="club">Club</option>
				<option value="college">College</option>
			</select>
			<select id="gender">
				<option value>-- GENDER --</option>
				<option value="men">Women</option>
				<option value="mixed">Mixed</option>
				<option value="women">Women</option>
			</select>
			<input type="text" id="team" name="team" placeholder="Enter team name">
		)
	}
});

export default teamSetup;