import React, { MouseEventHandler, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import Select, {
  components,
  GroupBase,
  MultiValueGenericProps,
  MultiValueProps,
  OnChangeValue,
  Props,
} from 'react-select';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEndHandler,
} from 'react-sortable-hoc';
import { SelectOptionType, useOptionsStore } from '../../hooks/optionsStore';
import './CustomInput.css';

type OptionType = {
  name: string;
  category: string;
  value: number;
  id: string;
};

const SortableMultiValue = SortableElement((props: MultiValueProps<SelectOptionType, true>) => {
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
}) as React.ComponentType<MultiValueProps<SelectOptionType, true, GroupBase<SelectOptionType>>>;

const SortableSelect = SortableContainer(Select) as React.ComponentClass<
  Props<SelectOptionType, true> & SortableContainerProps
>;

const SortableMultiValueLabel = SortableHandle((props: MultiValueGenericProps<SelectOptionType, true>) => (
  <components.MultiValueLabel {...props} />
)) as React.ComponentType<MultiValueGenericProps<SelectOptionType, true, GroupBase<SelectOptionType>>>;

const CustomInput = () => {
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const selectRef = useRef<any>(null);
  const { options, mutateOptions } = useOptionsStore();
  const { isLoading, error, data } = useQuery<OptionType[], Error>('optionsData', () =>
    fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete').then((response) => response.json())
  );
  const dataForSelect = data?.map((item) => {
    return { value: item.value.toString(), label: item.name };
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const onChange = (selectedOptions: OnChangeValue<SelectOptionType, true>) => {
    mutateOptions(selectedOptions as SelectOptionType[]);
  };

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    console.log(oldIndex);
    console.log(newIndex);
  };

  const filterOption = (option: SelectOptionType, input: string) => {
    // input[input.length - 1] && input[input.length - 1] === '+' ? setStartSearch(false) : setStartSearch(true);

    if (input) {
      if (option.label.toLowerCase().includes(input.toLowerCase())) return true;
      if (
        options.some((opt) => {
          if (opt.value === option.value) return true;
          else return false;
        })
      )
        return true;
      return false;
    }
    return true;
  };

  return (
    <SortableSelect
      ref={selectRef}
      className='SelectContainer'
      useDragHandle
      onSortEnd={onSortEnd}
      distance={4}
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      isMulti
      options={(dataForSelect as SelectOptionType[]) || []}
      value={options}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue,
        MultiValueLabel: SortableMultiValueLabel,
      }}
      filterOption={filterOption}
      openMenuOnClick={false}
      menuIsOpen={startSearch}
    />
  );
};

export default CustomInput;
