import React from 'react';
import { Stack } from 'react-bootstrap';
import { fancyTimeFormat } from '../utils/timehelper';
import NextLink from './NextLink';

interface LoopDetailsProps {
    loop: any;
    startTimeSeconds: any;
}

const LoopDetails = ({ loop, startTimeSeconds }: LoopDetailsProps) => {
  return (
    <div style={{marginTop: "1em"}}>
        <Stack>
        <p><b>Loop</b> {loop?.title}</p>
        <p><b>Appears at</b> {fancyTimeFormat(startTimeSeconds)}</p>
        <p><b>Source</b> {loop?.platform?.name}</p>
        <p><b>Created by</b> {loop?.loopmaker?.map((l: any) => l.name).join(", ")}</p>
        <p><b>Release</b> {formatLoopPackLinkHtml(loop, loop?.loopmaker[0]?.slug)}</p>
        </Stack>
    </div>
  );
};

const formatLoopPackLinkHtml = (loop: any, loopmakerSlug: any) => {
    if (loop) {    
      const loopPackPath = `/loopmakers/${loopmakerSlug}/packs/${loop?.loopPack?.slug}`;

      return (<NextLink href={loopPackPath}>{loop?.loopPack?.title}</NextLink>)
    }
}
    

export default LoopDetails;
