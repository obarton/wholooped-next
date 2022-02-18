import React from 'react';
import { Stack } from 'react-bootstrap';
import { fancyTimeFormat } from '../utils/timehelper';
import NextLink from './NextLink';
import { Desktop, Mobile } from './Responsive';

interface LoopDetailsProps {
    loop: any;
    startTimeSeconds: any;
}

const truncate = (input: string) => input?.length > 40 ? `${input.substring(0, 37)}...` : input;

const LoopDetails = ({ loop, startTimeSeconds }: LoopDetailsProps) => {
  return (
    <>
      <Desktop>
        <div style={{marginTop: "1em"}}>
            <Stack>
            <p><b>Loop</b> {loop?.title}</p>
            <p><b>Appears at</b> {fancyTimeFormat(startTimeSeconds)}</p>
            <p><b>Source</b> {loop?.platform?.name}</p>
            <p><b>Created by</b> {loop?.loopmaker?.map((l: any) => l.name).join(", ")}</p>
            <p><b>Release</b> {formatLoopPackLinkHtml(loop, loop?.loopmaker[0]?.slug)}</p>
            </Stack>
        </div>
      </Desktop>
      <Mobile>
        <div style={{marginTop: "1em"}}>
            <Stack>
            {/* Todo: Change to text wrap for long titles */}
            <p><b>Loop</b> {truncate(loop?.title)}</p>
            <p><b>Appears at</b> {fancyTimeFormat(startTimeSeconds)}</p>
            <p><b>Source</b> {loop?.platform?.name}</p>
            <p><b>Created by</b> {loop?.loopmaker?.map((l: any) => l.name).join(", ")}</p>
            <p><b>Release</b> {formatLoopPackLinkHtml(loop, loop?.loopmaker[0]?.slug)}</p>
            </Stack>
        </div>
      </Mobile>
    </>
  );
};

const formatLoopPackLinkHtml = (loop: any, loopmakerSlug: any) => {
    if (loop) {    
      const loopPackPath = `/loopmakers/${loopmakerSlug}/packs/${loop?.loopPack?.slug}`;

      return (<NextLink href={loopPackPath}>{loop?.loopPack?.title}</NextLink>)
    }
}
    

export default LoopDetails;
