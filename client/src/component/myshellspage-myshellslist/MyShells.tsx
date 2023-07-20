import { useNavigate, useParams } from 'react-router';
import {
  MyShellContainer,
  ImgBox,
  Title,
  ShellInfo,
  Category,
} from './MyShells.styled.ts';
import { Shells } from '../../dataset/TypeOfMyShells.ts';
import { SmallButton3 } from '../../common/button/Button.styled.ts';
import { useDeleteLikeShell } from '../../hooks/myshells/useDeleteLikeShell.ts';
import { getMemberIdFromLocalStorage } from '../../utill/localstorageData.ts';

const MyShells = ({ shell }: { shell: Shells }) => {
  const { id } = useParams<{ id: string }>();
  const urlId = id !== undefined ? +id : 0;

  const { mutate: DeleteLikeShell } = useDeleteLikeShell(shell.id);
  const navigate = useNavigate();
  const goToShellDetail = () => {
    navigate(`/shelldetail/${shell.id}`);
  };

  const handleDeleteLikeShell = () => {
    DeleteLikeShell();
  };

  return (
    <MyShellContainer onClick={goToShellDetail}>
      <ShellInfo>
        <ImgBox src={shell.picture} alt="shell-image" />
        <div>
          <Title>{shell.title}</Title>
          <Category>{shell.category}</Category>
        </div>
      </ShellInfo>
      {
        // getMemberIdFromLocalStorage() === urlId && (
        <div>
          <SmallButton3 onClick={handleDeleteLikeShell}>
            Cancel Like
          </SmallButton3>
        </div>
        // )
      }
    </MyShellContainer>
  );
};

export default MyShells;
