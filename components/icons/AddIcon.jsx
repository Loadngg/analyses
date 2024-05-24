import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

let AddIcon
export default AddIcon = props => (
	<Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props}>
		<Path stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 12h16m-8-8v16' />
	</Svg>
)
