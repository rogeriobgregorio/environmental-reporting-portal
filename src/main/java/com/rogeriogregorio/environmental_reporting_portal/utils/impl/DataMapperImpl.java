package com.rogeriogregorio.environmental_reporting_portal.utils.impl;

import com.rogeriogregorio.environmental_reporting_portal.utils.CatchError;
import com.rogeriogregorio.environmental_reporting_portal.utils.DataMapper;
import org.modelmapper.Condition;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataMapperImpl implements DataMapper {

    private final ModelMapper modelMapper;
    private final CatchError catchError;

    @Autowired
    public DataMapperImpl(ModelMapper modelMapper, CatchError catchError) {
        this.modelMapper = modelMapper;
        this.catchError = catchError;

        Condition<?, ?> notNull = Conditions.isNotNull();
        this.modelMapper.getConfiguration()
                .setPropertyCondition(notNull)
                .setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Override
    public <S, T> T map(S source, Class<T> targetClass) {
        return catchError.run(() -> modelMapper.map(source, targetClass));
    }

    @Override
    public <S, T> T map(S source, T target) {
        catchError.run(() -> modelMapper.map(source, target));
        return target;
    }
}

