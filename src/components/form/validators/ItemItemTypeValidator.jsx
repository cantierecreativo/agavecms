import React, { PropTypes } from 'react'
import Component from 'components/BaseComponent'
import { SelectInput, Field } from 'components/form'
import generateFormValidation from 'utils/generateFormValidation'
import validators from 'utils/validators'
import { connect } from 'react-redux'

class ItemItemTypeValidator extends Component {
  render() {
    const prefix = this.props.namePrefix

    const itemTypeOptions = this.props.itemTypes.map((itemType) => {
      return {
        value: itemType.id,
        label: itemType.attributes.name,
      }
    })

    return (
      <Field
        name={`${prefix}.item_types`}
        placeholder="Select one (or more) model(s)..."
      >
        <SelectInput
          multi
          options={itemTypeOptions}
        />
      </Field>
    )
  }
}

ItemItemTypeValidator.propTypes = {
  value: PropTypes.object.isRequired,
  fieldType: PropTypes.string.isRequired,
  namePrefix: PropTypes.string.isRequired,
  itemTypeId: PropTypes.string.isRequired,
  itemTypes: PropTypes.array,
}

function mapStateToProps(state) {
  const itemTypes = Object.values(state.itemTypes)
    .filter(({ attributes }) => !attributes.singleton)

  return { itemTypes }
}

export default {
  Component: connect(mapStateToProps)(ItemItemTypeValidator),
  isRequired: true,
  validate: generateFormValidation({
    item_types: [validators.minArrayLength(1)],
  }),
  fromJSON({ item_types: itemTypes }) {
    return { item_types: (itemTypes || []) }
  },
  toJSON({ item_types }) {
    return { item_types }
  },
  fields: ['item_types'],
}
